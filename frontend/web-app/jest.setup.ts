import '@testing-library/jest-dom';

import { configure } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';
import 'whatwg-fetch';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

configure({
  throwSuggestions: true
});

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin', id: 1 }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(
      () => ({ data: mockSession, status: 'authenticated' }) // return type is [] in v3 but changed to {} in v4
    )
  };
});
