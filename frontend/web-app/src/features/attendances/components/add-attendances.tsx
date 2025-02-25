'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PlusIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

// import { ToastAction } from "./ui/toast";
import { useEvents } from '@/context/events-context';
import {
  getAllDepartments,
  getEmployeesByDepartment
} from '@/lib/actions/department.actions';
import {
  AttendanceStatus,
  CreateAttendance,
  Department,
  Employee
} from 'types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createAttendance } from '@/lib/actions/attendance.actions';
import { DateTimePicker } from '@/components/calendar/date-picker';
import { cn } from '@/lib/utils';

const attendanceSchema = z.object({
  employeeId: z.string({ required_error: 'Please select an employee' }),
  employeeName: z.string({ required_error: 'Please select an employee' }),
  arriveTime: z
    .date({
      required_error: 'Please select an arrive time',
      invalid_type_error: "That's not a date!"
    })
    .optional(),
  leaveTime: z
    .date({
      required_error: 'Please select a leave time',
      invalid_type_error: "That's not a date!"
    })
    .optional(),
  date: z
    .date({
      required_error: 'Please select a date',
      invalid_type_error: "That's not a date!"
    })
    .optional(),
  status: z.enum(['Pending', 'Confirmed', 'Absent']).optional() //
});

const attendanceAddFormSchema = z.object({
  department: z.string({ required_error: 'Please select a department.' }),
  start: z.date({
    required_error: 'Please select a start time',
    invalid_type_error: "That's not a date!"
  }),
  end: z.date({
    required_error: 'Please select an end time',
    invalid_type_error: "That's not a date!"
  }),
  attendance: z.array(attendanceSchema)
});

type EventAddFormValues = z.infer<typeof attendanceAddFormSchema>;

interface EventAddFormProps {
  start: Date;
  end: Date;
}

export function AddAttendancesForm({ start, end }: EventAddFormProps) {
  const { events, addEvent } = useEvents();
  const { eventAddOpen, setEventAddOpen } = useEvents();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof attendanceAddFormSchema>>({
    resolver: zodResolver(attendanceAddFormSchema),
    defaultValues: {
      department: undefined
    }
  });

  useEffect(() => {
    form.reset({
      department: undefined,
      start: start,
      end: end
    });
  }, [form, start, end]);

  async function onSubmit(data: EventAddFormValues) {
    const transformedAttendances: CreateAttendance[] = data.attendance.map(
      (emp) => ({
        employeeId: emp.employeeId,
        arriveTime: data.start,
        leaveTime: data.end,
        date: new Date(data.start.toISOString().split('T')[0]), // Extracts YYYY-MM-DD only
        status: emp.status as AttendanceStatus // Ensure type safety
      })
    );

    try {
      // Send each attendance request individually in parallel
      await Promise.all(
        transformedAttendances.map((attendance) => createAttendance(attendance))
      );

      // If all requests succeed, add event
      const newEvent = {
        id: String(events.length + 1),
        title: 'Attendance Tracked',
        start: data.start,
        end: data.end,
        color: '#FFD1DC'
      };
      addEvent(newEvent);
      setEventAddOpen(false);
      toast({
        title: 'Attendances added!'
      });
    } catch (error) {
      console.error('Error creating attendances:', error);
      toast({
        title: 'Failed to add attendances',
        description: (error as Error).message,
        variant: 'destructive'
      });
    }
  }
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const watchDepartmentId = form.watch('department');
  const [departmentsData, setDepartmentsData] = React.useState<Department[]>(
    []
  );

  const { fields, append, prepend, remove, swap, move, replace } =
    useFieldArray({
      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
      name: 'attendance' // unique name for your Field Array
    });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departments = await getAllDepartments();
        setDepartmentsData(departments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (!watchDepartmentId) return;
    const fetchEmployeesByDepartment = async () => {
      try {
        const employees = await getEmployeesByDepartment(watchDepartmentId);

        // before appending, clear the fields
        replace([]);

        employees.forEach((employee) => {
          append({
            employeeId: employee.id,
            employeeName: employee.fullName
          });
        });
        setEmployees(employees);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployeesByDepartment();
  }, [watchDepartmentId]);

  const newDateMorning = new Date();
  newDateMorning.setHours(8, 0, 0, 0);

  return (
    <AlertDialog open={eventAddOpen}>
      <AlertDialogTrigger className='flex' asChild>
        <Button
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
          variant='default'
          onClick={() => setEventAddOpen(true)}
        >
          <PlusIcon className='h-3 w-3 md:h-5 md:w-5' />
          <p>Track Attendances</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Attendances</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
            <FormField
              control={form.control}
              name='department'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentsData.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {employees.length > 0 ? (
                <div>
                  <p className='font-bold'>Employees</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell className='flex-1 font-medium'>
                            {item.employeeName}
                          </TableCell>
                          <TableCell>
                            <RadioGroup
                              orientation='vertical'
                              defaultValue='Pending'
                              className='flex'
                              onValueChange={(value) =>
                                form.setValue(
                                  `attendance.${index}.status`,
                                  value as 'Pending' | 'Confirmed' | 'Absent'
                                )
                              }
                              {...form.register(`attendance.${index}.status`)}
                            >
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem
                                  value='Pending'
                                  id={`pending-${item.id}`} // Use unique IDs
                                />
                                <Label htmlFor={`pending-${item.id}`}>
                                  Pending
                                </Label>
                              </div>
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem
                                  value='Confirmed'
                                  id={`confirmed-${item.id}`} // Unique ID for this item
                                />
                                <Label htmlFor={`confirmed-${item.id}`}>
                                  Confirmed
                                </Label>
                              </div>
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem
                                  value='Absent'
                                  id={`absent-${item.id}`} // Unique ID for this item
                                />
                                <Label htmlFor={`absent-${item.id}`}>
                                  Absent
                                </Label>
                              </div>
                            </RadioGroup>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p></p>
              )}
            </div>

            <FormField
              control={form.control}
              name='start'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel htmlFor='datetime'>Arrive Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      defaultValue={newDateMorning}
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={12}
                      granularity='minute'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel htmlFor='datetime'>Leave Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={12}
                      granularity='minute'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className='pt-2'>
              <AlertDialogCancel onClick={() => setEventAddOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type='submit'>
                Add Attendances
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
