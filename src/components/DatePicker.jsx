"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export function DatePicker({ onChange, date }) {
  const handleDateChange = (date) => {
    onChange("date", date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left">
          {date ? format(date, "PPP") : "Select a date"}
          <CalendarIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <ReactDatePicker selected={date} onChange={handleDateChange} inline />
      </PopoverContent>
    </Popover>
  );
}
