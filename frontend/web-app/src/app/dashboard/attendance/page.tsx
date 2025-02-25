import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';

import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

import { getAllAttendances } from '@/lib/actions/attendance.actions';

import AttendanceListing from '@/features/attendances/components/attendance-listing';

import { AddAttendancesForm } from '@/features/attendances/components/add-attendances';
import { EventsProvider } from '@/context/events-context';
import { DateRangePicker } from '@/components/date-range-picker';

export const metadata = {
  title: 'Dashboard: Attendance'
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

  console.log('searchParams', searchParams);
  const attendances = await getAllAttendances(
    (searchParams?.startDate as string) ?? null,
    (searchParams?.endDate as string) ?? null
  );

  const newDateMorning = new Date();
  newDateMorning.setHours(8, 0, 0, 0);

  const newDateLeave = new Date();
  newDateLeave.setHours(17, 0, 0, 0);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Attendance'
            description='Manage the attendance of your employees'
          />
          <EventsProvider>
            <AddAttendancesForm start={newDateMorning} end={newDateLeave} />
          </EventsProvider>
        </div>

        {/* <ProductTableAction /> */}
        <div className='w-30 ml-auto'>
          <DateRangePicker />
        </div>

        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <AttendanceListing
            data={attendances}
            totalItems={attendances.length}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
