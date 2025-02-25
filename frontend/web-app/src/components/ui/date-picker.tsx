'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from './calendar';

interface DatePickerProps {
  onChange: (date: Date) => void;
  value?: Date;
  disabled?: boolean;
}

export function DatePicker({ onChange, disabled, value }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value || new Date());

  const handleChangedDate = (date: Date | undefined) => {
    setDate(date);
    onChange(date as Date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(date) => handleChangedDate(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
