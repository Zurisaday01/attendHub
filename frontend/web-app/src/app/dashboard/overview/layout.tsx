import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllAttendances } from '@/lib/actions/attendance.actions';
import { getAllDepartments } from '@/lib/actions/department.actions';
import { getAllEmployees } from '@/lib/actions/employee.actions';
import { formattedDate } from '@/lib/utils';
import {
  Activity,
  ChartColumnStacked,
  FileSpreadsheet,
  Users
} from 'lucide-react';
import React from 'react';

export default async function OverViewLayout({
  sales,
  pie_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  const departments = await getAllDepartments();
  const employees = await getAllEmployees();

  const activeEmployees = employees.filter(
    (employee) => employee.status === 'Active'
  );

  const attendances = await getAllAttendances();

  const todayAttendances = attendances.filter(
    (attendance) =>
      formattedDate(new Date(attendance.date)) === formattedDate(new Date())
  );

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Departments
              </CardTitle>
              <ChartColumnStacked className='w-5 text-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{departments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Employees
              </CardTitle>
              <Users className='w-5 text-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{employees.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Active Employees
              </CardTitle>
              <Activity className='w-5 text-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{activeEmployees.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total of Attendances Tracked Today
              </CardTitle>
              <FileSpreadsheet className='w-5 text-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {todayAttendances.length}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-7'>
          <div className='col-span-4 md:col-span-3'>
            {/* sales arallel routes */}
            {sales}
          </div>

          <div className='col-span-4 md:col-span-3'>{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
