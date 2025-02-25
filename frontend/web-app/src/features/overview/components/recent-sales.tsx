import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { getAllAttendances } from '@/lib/actions/attendance.actions';
import { formattedDate } from '@/lib/utils';
import { SquareCheckBig } from 'lucide-react';

export async function RecentSales() {
  const attendances = await getAllAttendances();

  if (!attendances) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Attendances Added</CardTitle>
        <CardDescription>Keep recording</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {attendances.slice(0, 6).map((attendance) => (
            <div className='flex items-center' key={attendance.id}>
              <SquareCheckBig className='w-4' />
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {attendance.employeeName}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {formattedDate(new Date(attendance.date))}
                </p>
              </div>
              <div className='ml-auto font-medium'>
                {new Date(attendance.arriveTime).toLocaleTimeString()} -{' '}
                {new Date(attendance.leaveTime).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
