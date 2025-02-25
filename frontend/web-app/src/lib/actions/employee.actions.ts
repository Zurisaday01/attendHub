'use server';

import { Employee } from 'types';
import { fetchWrapper } from '../fetch-wrapper';
import { revalidatePath } from 'next/cache';
import { FieldValues } from 'react-hook-form';

export async function getAllEmployees(): Promise<Employee[]> {
  return await fetchWrapper.get('employees');
}

export async function createEmployee(data: FieldValues) {
  return await fetchWrapper.post('employees', data);
}

export async function getDetailedEmployee(id: string): Promise<Employee> {
  return await fetchWrapper.get(`employees/${id}`);
}

export async function updateEmployee(data: FieldValues, id: string) {
  const res = await fetchWrapper.patch(`employees/${id}`, data);

  revalidatePath('/dashboard/employees');
  return res;
}

export async function deleteEmployee(id: string) {
  const res = await fetchWrapper.del(`employees/${id}`);
  revalidatePath('/dashboard/employees');
  return res;
}
