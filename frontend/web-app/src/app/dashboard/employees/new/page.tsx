import PageContainer from '@/components/layout/page-container';
import EmployeeForm from '@/features/employees/employee-form';
import { getAllDepartments } from '@/lib/actions/department.actions';
import { getAllRoles } from '@/lib/actions/role.actions';

export const metadata = {
  title: 'Dashboard : Create Employee'
};

const NewEmployeePage = async () => {
  const roles = await getAllRoles();
  const departments = await getAllDepartments();

  if (!roles || !departments) return null;

  return (
    <PageContainer scrollable>
      <EmployeeForm
        roles={roles}
        departments={departments}
        pageTitle='Create Employee'
        initialData={null}
      />
    </PageContainer>
  );
};
export default NewEmployeePage;
