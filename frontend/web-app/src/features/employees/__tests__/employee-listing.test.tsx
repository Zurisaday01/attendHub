import { Employee } from 'types';
import EmployeeListing from '../employee-listing';
import { render, screen } from '@testing-library/react';

jest.mock('@/lib/searchparams', () => ({
  searchParamsCache: {
    parse: jest.fn(() => ({})) // Ensures it returns an object instead of undefined
  },
  serialize: jest.fn(() => 'mockedKey'),
  searchParams: {
    q: {
      withOptions: jest.fn(() => ({
        withDefault: jest.fn(() => 'mockedKey')
      }))
    },
    departments: {
      withOptions: jest.fn(() => ({
        withDefault: jest.fn(() => 'mockedKey')
      }))
    },
    page: {
      withDefault: jest.fn(() => 'mockedKey')
    }
  }
}));

jest.mock('@/features/employees/table/use-employee-table-filters', () => ({
  useEmployeeTableFilters: jest.fn(() => ({ categoriesFilter: 'mockedKey' }))
}));

jest.mock('nuqs', () => {
  const parseAsIntegerMock = {
    withOptions: jest.fn(() => ({
      withDefault: jest.fn(() => 1)
    })),
    withDefault: jest.fn(() => {}),
    parseServerSide: jest.fn(() => 1)
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

const data: Employee[] = [
  {
    id: '019528a9-e376-72cc-acfb-921a8176e5a2',
    fullName: 'Pamela Espadas Martinez',
    email: 'pamelaespadas@example.com',
    department: {
      id: '019506b4-0789-75a2-a821-a82cbdc0a26e',
      name: 'Human Resources'
    },
    role: { id: '019506b4-0763-7383-a0a6-97c379385387', name: 'Manager' },
    dateOfJoining: '2025-10-18T00:00:00Z',
    status: 'Active'
  },
  {
    id: '0195197b-9429-7db4-951a-7da3417a8693',
    fullName: 'Zurisaday Espadas Martinez',
    email: 'zuriespadas@example.com',
    department: { id: '019506b4-0786-7f3d-a448-c69f5bcf4860', name: 'IT' },
    role: { id: '019506b4-0753-7e0d-b2c6-615bbe75d22d', name: 'Developer' },
    dateOfJoining: '2025-02-18T00:00:00Z',
    status: 'Active'
  }
];

describe('Employee Listing', () => {
  it('renders correctly', async () => {
    render(<EmployeeListing data={data} totalItems={2} />);

    // Check if the table is rendered correctly
    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  });

  it('renders the correct number of rows', async () => {
    render(<EmployeeListing data={data} totalItems={2} />);

    // Check if the table has the correct number of rows
    const rows = screen.getAllByRole('row');

    expect(rows.length).toBe(2);
  });

  it('renders the correct headers', async () => {
    render(<EmployeeListing data={data} totalItems={2} />);

    // correct number of headers
    const expectedHeaders = [
      'Full Name',
      'Email',
      'Department',
      'Role',
      'Date of Joining',
      'Status'
    ];

    expectedHeaders.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header })
      ).toBeInTheDocument();
    });
  });
});
