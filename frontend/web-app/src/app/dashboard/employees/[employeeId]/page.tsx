import PageContainer from '@/components/layout/page-container';
import EmployeeForm from '@/features/employees/employee-form';
import { getAllRoles } from '@/lib/actions/role.actions';
import { getAllDepartments } from '@/lib/actions/department.actions';
import { getDetailedEmployee } from '@/lib/actions/employee.actions';

export const metadata = {
  title: 'Dashboard : Update Employee'
};

type PageProps = { params: Promise<{ employeeId: string }> };

export default async function UpdateEmployeePage(props: PageProps) {
  const roles = await getAllRoles();
  const departments = await getAllDepartments();
  const params = await props.params;
  const employee = await getDetailedEmployee(params.employeeId);

  if (!roles || !departments) return null;
  return (
    <PageContainer scrollable>
      <EmployeeForm
        roles={roles}
        departments={departments}
        employeeId={params.employeeId}
        pageTitle='Update Employee'
        initialData={employee}
      />
    </PageContainer>
  );
}
