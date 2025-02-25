import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-primary'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2  className='w-10 text-primary-foreground animate-spin' />
        <p className='text-xl'>Loading...</p>
      </div>
    </div>
  );
}
