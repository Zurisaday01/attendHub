import FullCalendar from '@fullcalendar/react';
import { RefObject } from 'react';

export type calendarRef = RefObject<FullCalendar | null>;

// setting earliest / latest available time in minutes since Midnight
export const earliestTime = 540;
export const latestTime = 1320;

export const months = [
  {
    value: '1',
    label: 'January'
  },
  {
    value: '2',
    label: 'February'
  },
  {
    value: '3',
    label: 'March'
  },
  {
    value: '4',
    label: 'April'
  },
  {
    value: '5',
    label: 'May'
  },
  {
    value: '6',
    label: 'June'
  },
  {
    value: '7',
    label: 'July'
  },
  {
    value: '8',
    label: 'August'
  },
  {
    value: '9',
    label: 'September'
  },
  {
    value: '10',
    label: 'October'
  },
  {
    value: '11',
    label: 'November'
  },
  {
    value: '12',
    label: 'December'
  }
];

const getRandomDays = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const currentDate = new Date();

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  backgroundColor?: string;
}

// export const initialEvents: CalendarEvent[] = [
//   {
//     id: '1',
//     title: 'Daily Standup Meeting',
//     start: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate(),
//       12,
//       15
//     ),
//     end: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate(),
//       13,
//       0
//     ),
//     backgroundColor: '#FFD1DC'
//   },
//   {
//     id: '2',
//     title: 'Client Lunch',
//     start: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + 1,
//       16,
//       30
//     ),
//     end: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + 1,
//       17,
//       30
//     ),
//     backgroundColor: '#FFD1DC'
//   },
//   {
//     id: '3',
//     title: 'Counselor Meetup',
//     start: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate(),
//       18,
//       0
//     ),
//     end: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate(),
//       18,
//       45
//     ),
//     backgroundColor: '#B2E0B2'
//   },
//   {
//     id: '4',
//     title: 'Team Retreat',
//     start: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + 3,
//       8,
//       0
//     ),
//     end: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + 3,
//       18,
//       45
//     ),
//     backgroundColor: '#FFB3BA'
//   },
//   {
//     id: '5',
//     title: 'Time Management Workshop',
//     start: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + 5,
//       10,
//       0
//     ),
//     end: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + 5,
//       15,
//       30
//     ),
//     backgroundColor: '#FFDFBA'
//   },
//   {
//     id: '6',
//     title: 'Health and Wellness Fair',
//     start: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + getRandomDays(20, 24),
//       9,
//       0
//     ),
//     end: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + getRandomDays(25, 29),
//       15,
//       0
//     ),
//     backgroundColor: '#B9FBC0'
//   },
//   {
//     id: '7',
//     title: 'Book Club Discussion',
//     start: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + getRandomDays(30, 34),
//       18,
//       0
//     ),
//     end: new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + getRandomDays(35, 39),
//       20,
//       0
//     ),
//     backgroundColor: '#C3B1E1'
//   }
// ];
