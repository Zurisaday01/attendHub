'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignInViewPage() {
  return (
    <section className='flex h-screen w-full items-center bg-gradient-to-r from-gray-100 to-accent'>
      <div className='mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl'>
        <div className='space-y-8 text-center'>
          <div className='mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl'>
            <h1>
              Track and Manage <span className='text-primary'> Attendance</span>{' '}
              with Ease
            </h1>
          </div>

          <p
            data-testid='homepage-description'
            className='mx-auto max-w-screen-sm text-xl text-muted-foreground'
          >
            Manage employee attendance across departments easily. Track hours,
            absences, and schedules in one place.
          </p>

          <div className='space-y-4 md:space-x-4 md:space-y-0'>
            <Button
              className='group/arrow w-5/6 font-bold md:w-1/4'
              onClick={() =>
                signIn(
                  'id-server',
                  { callbackUrl: '/dashboard' },
                  { prompt: 'login' }
                )
              }
            >
              Log in
              <ArrowRight className='ml-2 size-5 transition-transform group-hover/arrow:translate-x-1' />
            </Button>

            <Button
              asChild
              variant='secondary'
              className='w-5/6 font-bold md:w-1/4'
            >
              <Link
                href='https://github.com/Zurisaday01/attendHub'
                target='_blank'
              >
                Github respository
              </Link>
            </Button>
          </div>
        </div>

        <div className='group relative mt-14'>
          <div className='absolute left-1/2 top-2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80'></div>

          <div className='absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28'></div>
        </div>
      </div>
    </section>
  );
}
