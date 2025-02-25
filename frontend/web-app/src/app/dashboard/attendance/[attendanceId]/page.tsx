import PageContainer from '@/components/layout/page-container';
import AttendanceForm from '@/features/attendances/components/attendance-form';
import { getDetailedAttendance } from '@/lib/actions/attendance.actions';

export const metadata = {
  title: 'Dashboard : Update Attendance'
};

type PageProps = { params: Promise<{ attendanceId: string }> };

export default async function UpdateEmployeePage(props: PageProps) {
  const params = await props.params;
  const attendance = await getDetailedAttendance(params.attendanceId);

  return (
    <PageContainer scrollable>
      <AttendanceForm
        attendanceId={params.attendanceId}
        pageTitle={`Update Attendance: ${attendance.employeeName}`}
        initialData={attendance}
      />
    </PageContainer>
  );
}
