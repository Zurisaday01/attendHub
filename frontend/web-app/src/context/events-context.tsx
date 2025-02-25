'use client';
import { getAllAttendances } from '@/lib/actions/attendance.actions';
import { CalendarEvent, initialEvents } from '@/lib/data';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { date } from 'zod';

interface Event {
  id: string;
  title: string;
  color: string;
  start: Date;
  end: Date;
}

interface EventsContextType {
  events: CalendarEvent[];
  addEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  eventViewOpen: boolean;
  setEventViewOpen: (value: boolean) => void;
  eventAddOpen: boolean;
  setEventAddOpen: (value: boolean) => void;
  eventEditOpen: boolean;
  setEventEditOpen: (value: boolean) => void;
  eventDeleteOpen: boolean;
  setEventDeleteOpen: (value: boolean) => void;
  availabilityCheckerEventAddOpen: boolean;
  setAvailabilityCheckerEventAddOpen: (value: boolean) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

export const EventsProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventViewOpen, setEventViewOpen] = useState(false);
  const [eventAddOpen, setEventAddOpen] = useState(false);
  const [eventEditOpen, setEventEditOpen] = useState(false);
  const [eventDeleteOpen, setEventDeleteOpen] = useState(false);
  const [availabilityCheckerEventAddOpen, setAvailabilityCheckerEventAddOpen] =
    useState(false);

  const addEvent = (event: CalendarEvent) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => Number(event.id) !== Number(id))
    );
  };

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await getAllAttendances();

        // Extract unique dates
        const uniqueDates = [
          ...Array.from(
            new Set(
              response.map((att) => ({
                date: att.date.split('T')[0],
                start: att.arriveTime,
                end: att.leaveTime
              }))
            )
          ) // Extract only YYYY-MM-DD
        ];

        uniqueDates.forEach((date) => {
          setEvents((prevEvents) => [
            ...prevEvents,
            {
              id: date.date + date.start + date.end,
              title: 'Attendance trancked',
              color: '#FFD1DC',
              start: new Date(date.start),
              end: new Date(date.end)
            }
          ]);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendances();
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        deleteEvent,
        eventViewOpen,
        setEventViewOpen,
        eventAddOpen,
        setEventAddOpen,
        eventEditOpen,
        setEventEditOpen,
        eventDeleteOpen,
        setEventDeleteOpen,
        availabilityCheckerEventAddOpen,
        setAvailabilityCheckerEventAddOpen
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
