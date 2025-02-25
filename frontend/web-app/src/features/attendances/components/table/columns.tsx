'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Attendance } from 'types';
import { formattedDate } from '@/lib/utils';

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: 'date',
    header: 'DATE',
    cell: ({ row }) => {
      return formattedDate(new Date(row.original.date));
    }
  },
  {
    accessorKey: 'employeeName',
    header: 'Employee Name'
  },
  {
    accessorKey: 'arriveTime',
    header: 'Arrive Time',
    cell: ({ row }) => {
      const date = new Date(row.original.arriveTime);
      return date.toLocaleTimeString();
    }
  },
  {
    accessorKey: 'leaveTime',
    header: 'Leave Time',
    cell: ({ row }) => {
      const date = new Date(row.original.leaveTime);
      return date.toLocaleTimeString();
    }
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
