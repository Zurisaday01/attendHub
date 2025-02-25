import { DataTable as AttendanceTable } from '@/components/ui/table/data-table';
import { columns } from './table/columns';
import { Attendance } from 'types';

interface AttendanceListingPage {
  data: Attendance[];
  totalItems: number;
}

export default async function AttendanceListing({
  data,
  totalItems
}: AttendanceListingPage) {
  return (
    <AttendanceTable columns={columns} data={data} totalItems={totalItems} />
  );
}
