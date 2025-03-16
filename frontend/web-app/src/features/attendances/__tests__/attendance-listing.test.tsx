import { Attendance } from 'types';
import AttendanceListing from '../components/attendance-listing';
import { render, screen } from '@testing-library/react';

jest.mock('nuqs', () => {
  const parseAsIntegerMock = {
    withOptions: jest.fn(() => ({
      withDefault: jest.fn(() => 1),
      parseServerSide: jest.fn(() => 1)
    }))
  };

  return {
    __esModule: true,
    parseAsInteger: parseAsIntegerMock,
    useQueryState: jest.fn(() => [1, jest.fn()])
  };
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn()
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn()
  })),
  usePathname: jest.fn(() => '/dashboard/attendance')
}));

const data: Attendance[] = [
  {
    id: '01953d49-9ab9-7390-bb0a-92f19272c942',
    employeeId: '01952ae9-b7fd-76ee-b166-d398a30b9a0e',
    employeeName: 'Luis Hernández Ramírez',
    department: { id: '019506b4-0786-7f3d-a448-c69f5bcf4860', name: 'IT' },
    role: { id: '019506b4-0753-7e0d-b2c6-615bbe75d22d', name: 'Developer' },
    arriveTime: '2025-02-02T14:00:00Z',
    leaveTime: '2025-02-03T23:00:00Z',
    date: '2025-02-02T00:00:00Z',
    status: 'Confirmed'
  },
  {
    id: '01953d49-9a78-774f-a034-f703004c5db5',
    employeeId: '01952ae9-5c50-797c-b82e-2db7c530c1c4',
    employeeName: 'Carlos Garcia López',
    department: { id: '019506b4-0786-7f3d-a448-c69f5bcf4860', name: 'IT' },
    role: { id: '019506b4-0753-7e0d-b2c6-615bbe75d22d', name: 'Developer' },
    arriveTime: '2025-02-02T14:00:00Z',
    leaveTime: '2025-02-03T23:00:00Z',
    date: '2025-02-02T00:00:00Z',
    status: 'Confirmed'
  }
];

describe('Attendance Listing', () => {
  it('renders correctly', async () => {
    render(<AttendanceListing data={data} totalItems={2} />);

    // Check if the table is rendered correctly
    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  });

  it('renders the correct number of rows', async () => {
    render(<AttendanceListing data={data} totalItems={2} />);

    // Check if the table has the correct number of rows
    const rows = screen.getAllByRole('row');

    expect(rows.length).toBe(2); // 2 rows + 1 header row
  });

  it('renders the correct headers', async () => {
    render(<AttendanceListing data={data} totalItems={2} />);

    // correct number of headers
    const expectedHeaders = [
      'Date',
      'Employee Name',
      'Arrive Time',
      'Leave Time',
      'Status'
    ];

    expectedHeaders.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header })
      ).toBeInTheDocument();
    });
  });
});
