'use server';

import { Role } from 'types';
import { fetchWrapper } from '../fetch-wrapper';

export async function getAllRoles(): Promise<Role[]> {
  return await fetchWrapper.get('roles');
}
