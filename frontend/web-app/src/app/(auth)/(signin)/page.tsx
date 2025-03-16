import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sigin-view';

export const metadata: Metadata = {
  title: 'Welcome to AttendHub',
  description: 'Welcome to AttendHub, the best attendance management system.'
};

export default async function WelcomePage() {
  return <SignInViewPage />;
}
