'use server';

import { Department, Employee } from 'types';
import { fetchWrapper } from '../fetch-wrapper';

export async function getAllDepartments(): Promise<Department[]> {
  return await fetchWrapper.get('departments');
}

export async function getEmployeesByDepartment(
  id: string
): Promise<Employee[]> {
  return await fetchWrapper.get(`departments/employees/${id}`);
}
