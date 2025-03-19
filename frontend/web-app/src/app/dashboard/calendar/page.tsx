import Calendar from '@/components/calendar/calendar';
import { Separator } from '@/components/ui/separator';
import { EventsProvider } from '@/context/events-context';

export default function CalendarPage() {
  return (
    <EventsProvider>
      <div className='py-4'>
        <div className='w-full space-y-5 px-5'>
          <div className='space-y-0'>
            <h2 className='flex items-center text-2xl font-semibold tracking-tight md:text-3xl'>
              Calendar
            </h2>
            <p className='text-xs font-medium md:text-sm'>
              A quick way of seeing all the attendances in one place.
            </p>
          </div>

          <Separator />
          <Calendar />
        </div>
      </div>
    </EventsProvider>
  );
}
