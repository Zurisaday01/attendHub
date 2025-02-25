import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';
import { cookies } from 'next/headers';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // Redirect to login page if not authenticated

  const isAuthenticated = !!req.auth;
  const isRootPath = req.nextUrl.pathname === '/';
  const cookieStore = await cookies();

  if (!isAuthenticated && !isRootPath) {
    cookieStore.delete('authjs.session-token');
    // Redirect unauthenticated users to the login page
    return Response.redirect(new URL('/', req.url));
  }

  if (isAuthenticated && isRootPath) {
    // Redirect authenticated users from `/` to `/dashboard`
    return Response.redirect(new URL('/dashboard', req.url));
  }

  return;
});

export const config = { matcher: ['/', '/dashboard/:path*'] };
