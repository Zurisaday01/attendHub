'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Employee } from 'types';
import { Badge } from '@/components/ui/badge';
import { formattedDate } from '@/lib/utils';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'fullName',
    header: 'Full Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => {
      return row.original.department.name;
    }
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return row.original.role.name;
    }
  },
  {
    accessorKey: 'dateOfJoining',
    header: 'Date of Joining',
    cell: ({ row }) => {
      const date = new Date(row.original.dateOfJoining);
      return formattedDate(new Date(date));
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <Badge>{row.original.status}</Badge>;
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
