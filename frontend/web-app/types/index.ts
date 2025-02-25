import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type AttendanceStatus = 'Pending' | 'Confirmed' | 'Absent';
export type EmployeeStatus = 'Active' | 'Inactive' | 'OnLeave';

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  role: Role;
  arriveTime: string;
  leaveTime: string;
  date: string;
  status: AttendanceStatus;
}

export interface CreateAttendance {
  employeeId: string;
  arriveTime: Date;
  leaveTime: Date;
  date: Date;
  status: AttendanceStatus;
}

export interface Employee {
  id: string;
  fullName: string;
  department: Department;
  role: Role;
  email: string;
  dateOfJoining: string;
  status: EmployeeStatus;
}

export interface CreateEmployee {
  fullName: string;
  departmentId: string;
  roleId: string;
  email: string;
  dateOfJoining: Date;
  status: EmployeeStatus;
}

export interface Department {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
}
