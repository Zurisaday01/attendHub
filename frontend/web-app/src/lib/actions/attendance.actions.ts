'use server';

import { Attendance } from 'types';
import { fetchWrapper } from '../fetch-wrapper';
import { revalidatePath } from 'next/cache';
import { FieldValues } from 'react-hook-form';

export async function getAllAttendances(
  startDate?: string | null,
  endDate?: string | null
): Promise<Attendance[]> {
  return await fetchWrapper.get(
    `attendances${startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : ''}`
  );
}

export async function createAttendance(data: FieldValues) {
  const res = await fetchWrapper.post('attendances', data);
  revalidatePath('/dashboard/attendance');
  return res;
}

export async function getDetailedAttendance(id: string): Promise<Attendance> {
  return await fetchWrapper.get(`attendances/${id}`);
}

export async function updateAttendance(data: FieldValues, id: string) {
  const res = await fetchWrapper.patch(`attendances/${id}`, data);
  revalidatePath('/dashboard/attendance');
  return res;
}

export async function deleteAttendance(id: string) {
  const res = await fetchWrapper.del(`attendances/${id}`);
  revalidatePath('/dashboard/attendance');
  return res;
}
