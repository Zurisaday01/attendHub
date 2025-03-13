import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import EmployeeListing from '@/features/employees/employee-listing';
import { getAllEmployees } from '@/lib/actions/employee.actions';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import EmployeesTableAction from '@/features/employees/table/employees-table-action';
import { getAllDepartments } from '@/lib/actions/department.actions';

export const metadata = {
  title: 'Dashboard: Employees'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function AttendancePage(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  const employees = await getAllEmployees();

  const departments = await getAllDepartments();

  if (!employees || !departments) return null;

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Employees'
            description='Manage the employees of your company'
          />
          <Link
            href='/dashboard/employees/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> New Employee
          </Link>
        </div>
        <Separator />
        <EmployeesTableAction departments={departments} />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <EmployeeListing data={employees} totalItems={employees.length} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
