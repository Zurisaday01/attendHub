'use client';

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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { createEmployee, updateEmployee } from '@/lib/actions/employee.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Department, Employee, Role } from 'types';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Employee full name must be at least 5 characters.'
  }),
  email: z.string().email('Invalid email address'),
  departmentId: z.string(),
  roleId: z.string(),
  dateOfJoining: z.coerce.date(),
  status: z.string()
});

export default function EmployeeForm({
  initialData,
  pageTitle,
  departments,
  roles,
  employeeId
}: {
  initialData: Employee | null;
  pageTitle: string;
  departments: Department[];
  employeeId?: string;
  roles: Role[];
}) {
  const defaultValues = {
    fullName: initialData?.fullName || '',
    departmentId: initialData?.department.id || '',
    roleId: initialData?.role.id || 0,
    email: initialData?.email || '',
    dateOfJoining: initialData?.dateOfJoining
      ? new Date(initialData.dateOfJoining)
      : undefined,
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
        if (employeeId) {
          // Update employee
          await updateEmployee(values, employeeId);

          toast('Employee updated successfully', {
            action: (
              <Button onClick={() => router.push('/dashboard/employees')}>
                Employees
              </Button>
            )
          });
        } else {
          // Create employee
          await createEmployee(values);

          toast('Employee created successfully', {
            action: (
              <Button onClick={() => router.push('/dashboard/employees')}>
                Employees
              </Button>
            )
          });

          form.reset({
            fullName: '',
            email: '',
            departmentId: '',
            roleId: '',
            dateOfJoining: undefined,
            status: ''
          });
        }
      });
    } catch (error) {
      toast('Failed to create employee');
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
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isLoading || isPending}
                        autoComplete='off'
                        placeholder='Enter full name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isLoading || isPending}
                        autoComplete='off'
                        type='email'
                        placeholder='Enter email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='departmentId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select
                      disabled={form.formState.isLoading || isPending}
                      onValueChange={(value) => field.onChange(value)}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select department' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='roleId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={form.formState.isLoading || isPending}
                      onValueChange={(value) => field.onChange(value)}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <SelectItem value='Active'>Active</SelectItem>
                        <SelectItem value='Inactive'>Inactive</SelectItem>
                        <SelectItem value='OnLeave'>On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='dateOfJoining'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel>Date Of Joining</FormLabel>
                  <DatePicker
                    disabled={form.formState.isLoading || isPending}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={form.formState.isLoading || isPending}
            >
              {employeeId ? 'Update' : 'Create'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
