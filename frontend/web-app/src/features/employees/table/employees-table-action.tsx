'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { useEmployeeTableFilters } from './use-employee-table-filters';
import { Department } from 'types';

export default function EmployeesTableAction({
  departments
}: {
  departments: Department[];
}) {
  const {
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useEmployeeTableFilters();
  return (
    <div className='flex flex-wrap items-center gap-4'>
      {/* <DataTableSearch
        searchKey='name'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      /> */}
      <DataTableFilterBox
        filterKey='department.id'
        title='Department'
        options={departments.map((department) => ({
          value: department.id,
          label: department.name
        }))}
        setFilterValue={setCategoriesFilter}
        filterValue={categoriesFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
