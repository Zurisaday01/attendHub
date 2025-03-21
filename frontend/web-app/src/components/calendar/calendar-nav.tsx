"use client";

import { cn } from "@/lib/utils";
import { months } from "@/lib/data";
import { calendarRef } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  generateDaysInMonth,
  goNext,
  goPrev,
  goToday,
  handleDayChange,
  handleMonthChange,
  handleYearChange,
  setView,
} from "./calendar-utils";
import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  GalleryVertical,
  Table,
  Tally3,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventAddForm } from "./event-add-form";

interface CalendarNavProps {
  calendarRef: calendarRef;
  start: Date;
  end: Date;
  viewedDate: Date;
}

export default function CalendarNav({
  calendarRef,
  start,
  end,
  viewedDate,
}: CalendarNavProps) {
  const [currentView, setCurrentView] = useState("timeGridWeek");

  const selectedMonth = viewedDate.getMonth() + 1;
  const selectedDay = viewedDate.getDate();
  const selectedYear = viewedDate.getFullYear();

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const dayOptions = generateDaysInMonth(daysInMonth);

  const [daySelectOpen, setDaySelectOpen] = useState(false);
  const [monthSelectOpen, setMonthSelectOpen] = useState(false);

  return (
    <div className="flex flex-wrap min-w-full justify-center gap-3 px-10 ">
      <div className="flex flex-row space-x-1">
        {/* Navigate to previous date interval */}

        <Button
          variant="ghost"
          className="w-8"
          onClick={() => {
            goPrev(calendarRef);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Day Lookup */}

        {currentView == "timeGridDay" && (
          <Popover open={daySelectOpen} onOpenChange={setDaySelectOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-20 justify-between text-xs font-semibold"
              >
                {selectedDay
                  ? dayOptions.find((day) => day.value === String(selectedDay))
                      ?.label
                  : "Select day..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search day..." />
                <CommandList>
                  <CommandEmpty>No day found.</CommandEmpty>
                  <CommandGroup>
                    {dayOptions.map((day) => (
                      <CommandItem
                        key={day.value}
                        value={day.value}
                        onSelect={(currentValue) => {
                          handleDayChange(
                            calendarRef,
                            viewedDate,
                            currentValue
                          );
                          //   setValue(currentValue === selectedMonth ? "" : currentValue);
                          setDaySelectOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            String(selectedDay) === day.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {day.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {/* Month Lookup */}

        <Popover open={monthSelectOpen} onOpenChange={setMonthSelectOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="flex w-[105px] justify-between overflow-hidden p-2 text-xs font-semibold md:text-sm md:w-[120px]"
            >
              {selectedMonth
                ? months.find((month) => month.value === String(selectedMonth))
                    ?.label
                : "Select month..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search month..." />
              <CommandList>
                <CommandEmpty>No month found.</CommandEmpty>
                <CommandGroup>
                  {months.map((month) => (
                    <CommandItem
                      key={month.value}
                      value={month.value}
                      onSelect={(currentValue) => {
                        handleMonthChange(
                          calendarRef,
                          viewedDate,
                          currentValue
                        );
                        //   setValue(currentValue === selectedMonth ? "" : currentValue);
                        setMonthSelectOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          String(selectedMonth) === month.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {month.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Year Lookup */}

        <Input
          className="w-[75px] md:w-[85px] text-xs md:text-sm font-semibold"
          type="number"
          value={selectedYear}
          onChange={(value) => handleYearChange(calendarRef, viewedDate, value)}
        />

        {/* Navigate to next date interval */}

        <Button
          variant="ghost"
          className="w-8"
          onClick={() => {
            goNext(calendarRef);
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {/* Button to go to current date */}

        <Button
          className="w-[90px] text-xs md:text-sm"
          variant="outline"
          onClick={() => {
            goToday(calendarRef);
          }}
        >
          {currentView === "timeGridDay"
            ? "Today"
            : currentView === "timeGridWeek"
            ? "This Week"
            : currentView === "dayGridMonth"
            ? "This Month"
            : null}
        </Button>

        {/* Change view with tabs */}

        <Tabs defaultValue="timeGridWeek">
          <TabsList className="flex w-44 md:w-64">
            <TabsTrigger
              value="timeGridDay"
              onClick={() =>
                setView(calendarRef, "timeGridDay", setCurrentView)
              }
              className={`space-x-1 ${
                currentView === "timeGridDay" ? "w-1/2" : "w-1/4"
              }`}
            >
              <GalleryVertical className="h-5 w-5" />
              {currentView === "timeGridDay" && (
                <p className="text-xs md:text-sm">Day</p>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="timeGridWeek"
              onClick={() =>
                setView(calendarRef, "timeGridWeek", setCurrentView)
              }
              className={`space-x-1 ${
                currentView === "timeGridWeek" ? "w-1/2" : "w-1/4"
              }`}
            >
              <Tally3 className="h-5 w-5" />
              {currentView === "timeGridWeek" && (
                <p className="text-xs md:text-sm">Week</p>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="dayGridMonth"
              onClick={() =>
                setView(calendarRef, "dayGridMonth", setCurrentView)
              }
              className={`space-x-1 ${
                currentView === "dayGridMonth" ? "w-1/2" : "w-1/4"
              }`}
            >
              <Table className="h-5 w-5 rotate-90" />
              {currentView === "dayGridMonth" && (
                <p className="text-xs md:text-sm">Month</p>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Add event button  */}

        <EventAddForm start={start} end={end} />
      </div>
    </div>
  );
}
