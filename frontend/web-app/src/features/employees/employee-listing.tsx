'use client';
import { DataTable as EmployeeTable } from '@/components/ui/table/data-table';
import { columns } from './table/columns';
import { Employee } from 'types';
import { useEmployeeTableFilters } from './table/use-employee-table-filters';

interface EmployeeListingPage {
  data: Employee[];
  totalItems: number;
}

export default function EmployeeListing({
  data,
  totalItems
}: EmployeeListingPage) {
  const { categoriesFilter } = useEmployeeTableFilters();

  const departments = categoriesFilter.split('.');

  const filteredData = data.filter((employee) => {
    return departments.includes(employee.department.id);
  });

  return (
    <EmployeeTable
      columns={columns}
      data={filteredData.length > 0 ? filteredData : data}
      totalItems={filteredData.length > 0 ? filteredData.length : totalItems}
    />
  );
}
