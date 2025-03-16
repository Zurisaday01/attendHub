'use client';

import { DateTimePicker } from '@/components/calendar/date-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  createAttendance,
  updateAttendance
} from '@/lib/actions/attendance.actions';
import { createEmployee, updateEmployee } from '@/lib/actions/employee.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Attendance, Department, Employee, Role } from 'types';
import * as z from 'zod';

const formSchema = z.object({
  employeeId: z.string(),
  arriveTime: z.coerce.date(),
  leaveTime: z.coerce.date(),
  date: z.coerce.date(),
  status: z.string()
});

export default function AttendanceForm({
  initialData,
  pageTitle,
  attendanceId
}: {
  initialData: Attendance | null;
  pageTitle: string;
  attendanceId?: string;
}) {
  const defaultValues = {
    employeeId: initialData?.employeeId || '',
    arriveTime: initialData?.arriveTime
      ? new Date(initialData.arriveTime)
      : undefined,
    leaveTime: initialData?.leaveTime
      ? new Date(initialData.leaveTime)
      : undefined,
    date: initialData?.date ? new Date(initialData.date) : undefined,
    status: initialData?.status || ''
  };

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues as z.infer<typeof formSchema>
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startTransition(async () => {
        if (attendanceId) {
          // Update employee
          await updateAttendance(values, attendanceId);

          toast('Attendance updated successfully', {
            action: (
              <Button onClick={() => router.push('/dashboard/attendance')}>
                Attendances
              </Button>
            )
          });
        } else {
          // Create employee
          await createAttendance(values);

          toast('Attendance created successfully', {
            action: (
              <Button onClick={() => router.push('/dashboard/attendance')}>
                Attendances
              </Button>
            )
          });

          form.reset({
            employeeId: '',
            arriveTime: undefined,
            leaveTime: undefined,
            date: undefined,
            status: ''
          });
        }
      });
    } catch (error) {
      toast('Something went wrong');
    }
  }

  return (
    <Card className='mx-auto w-full bg-background'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                      disabled={form.formState.isLoading || isPending}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='arriveTime'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel htmlFor='datetime'>Arrive Time</FormLabel>
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
              <FormField
                control={form.control}
                name='leaveTime'
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

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={form.formState.isLoading || isPending}
                      onValueChange={(value) => field.onChange(value)}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Pending'>Pending</SelectItem>
                        <SelectItem value='Confirmed'>Confirmed</SelectItem>
                        <SelectItem value='Absent'>Absent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type='submit'
              disabled={form.formState.isLoading || isPending}
            >
              {attendanceId ? 'Update' : 'Create'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
