// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import UpdateEmployeePage from '../[attendanceId]/page';
import { getDetailedAttendance } from '@/lib/actions/attendance.actions';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn()
  }))
}));

jest.mock('@/lib/actions/attendance.actions', () => ({
  getDetailedAttendance: jest.fn(() =>
    Promise.resolve({
      id: '01953dbb-4750-7409-a383-d9de91fd663c',
      employeeId: '01953da1-52ea-779a-ac38-e71832181546',
      employeeName: 'Marco Estrada',
      department: {
        id: '01951570-1104-7d08-b165-63d820caf332',
        name: 'Tech Support'
      },
      role: { id: '019506b4-0753-7e0d-b2c6-615bbe75d22d', name: 'Developer' },
      arriveTime: '2025-02-25T14:00:00Z',
      leaveTime: '2025-02-25T23:00:00Z',
      date: '2025-02-25T00:00:00Z',
      status: 'Confirmed'
    })
  )
}));

describe('Attendance Details Page', () => {
  it('fetches an specific attendance record', async () => {
    render(
      await UpdateEmployeePage({
        params: Promise.resolve({
          attendanceId: '01953dbb-4750-7409-a383-d9de91fd663c'
        })
      })
    );
    expect(getDetailedAttendance).toHaveBeenCalledTimes(1);
  });
  it('render the name of the employee ', async () => {
    render(
      await UpdateEmployeePage({
        params: Promise.resolve({
          attendanceId: '01953dbb-4750-7409-a383-d9de91fd663c'
        })
      })
    );

    const heading = screen.getByRole('heading', { level: 3 });

    expect(heading).toHaveTextContent('Update Attendance: Marco Estrada');
  });
});
