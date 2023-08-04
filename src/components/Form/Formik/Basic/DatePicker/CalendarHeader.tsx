import React from "react";
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import DatePickerCalendarHeaderControl from "./CalendarHeaderControl";

interface DatePickerCalendarHeaderProps {
  months: string[];
  years: number[];
  month: number;
  year: number;
  onChangeMonth: (type: "prev" | "next") => void;
  onSelectMonth: (m: number) => void;
  onSelectYear: (y: number) => void;
}

const DatePickerCalendarHeader: React.FC<DatePickerCalendarHeaderProps> = ({
  months,
  month,
  years,
  year,
  onChangeMonth,
  onSelectMonth,
  onSelectYear,
}) => {
  return (
    <div className="calendar-header">
      <button
        className="header-button"
        type="button"
        onClick={() => onChangeMonth("prev")}
      >
        <FaAngleLeft size={18} />
      </button>

      <DatePickerCalendarHeaderControl
        months={months}
        month={month}
        years={years}
        year={year}
        onSelectMonth={onSelectMonth}
        onSelectYear={onSelectYear}
      />

      <button
        className="header-button"
        type="button"
        onClick={() => onChangeMonth("next")}
      >
        <FaAngleRight size={18} />
      </button>
    </div>
  );
};

export default DatePickerCalendarHeader;
