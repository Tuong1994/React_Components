import React from "react";
import { IDate } from "@/common/type/form";
import DatePickerCalendarHeader from "./CalendarHeader";
import DatePickerCalendarDate from "./CalendarDate";
import DatePickerCalendarDay from "./CalendarDay";

interface DatePickerCalendarProps {
  isDropdown: boolean;
  isBottom: boolean;
  selectValue: Date;
  handleChange: (d: IDate) => void;
}

const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  isDropdown,
  isBottom,
  selectValue,
  handleChange,
}) => {
  const [date, setDate] = React.useState<Date>(selectValue);

  const [month, setMonth] = React.useState<number>(new Date().getMonth());

  const [year, setYear] = React.useState<number>(new Date().getFullYear());

  const days = React.useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    []
  );

  const months = React.useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const years = React.useMemo(() => {
    let startYear = 1970;

    const y: number[] = [];

    const currentYear = new Date().getFullYear();

    while (startYear <= currentYear) {
      y.push(startYear++);
    }

    return y;
  }, []);

  const lastDateOfMonth = React.useMemo<number>(
    () => new Date(year, month + 1, 0).getDate(),
    [year, month]
  );

  const lastDateOfPrevMonth = React.useMemo<number>(
    () => new Date(year, month, 0).getDate(),
    [year, month]
  );

  const firstDayOfMonth = React.useMemo<number>(
    () => new Date(year, month, 1).getDay(),
    [year, month]
  );

  const lastDayOfMonth = React.useMemo<number>(
    () => new Date(year, month, lastDateOfMonth).getDay(),
    [year, month, lastDateOfMonth]
  );

  const generateDate = (d: Date, date: number, type: "main" | "sub") => {
    return {
      fullDate: d,
      day: d.getDay(),
      month: d.getMonth(),
      year: d.getFullYear(),
      date,
      type,
    };
  };

  const dateRange = React.useMemo<IDate[]>(() => {
    const dates: IDate[] = [];

    // creating list of previous month last date
    for (let i = firstDayOfMonth; i > 0; i--) {
      const d = new Date(year, month - 1, lastDateOfPrevMonth - i + 1);

      const value = generateDate(d, lastDateOfPrevMonth - i + 1, "sub");

      dates.push(value);
    }

    // creating list of current month date
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const d = new Date(year, month, i);

      const value = generateDate(d, i, "main");

      dates.push(value);
    }

    // creating list of next month first date
    for (let i = lastDayOfMonth; i < 6; i++) {
      const d = new Date(year, month + 1, i - lastDayOfMonth + 1);

      const value = generateDate(d, i - lastDayOfMonth + 1, "sub");

      dates.push(value);
    }

    return dates;
  }, [firstDayOfMonth, lastDateOfMonth, lastDateOfMonth, lastDateOfPrevMonth]);

  const isSelectedDate = React.useCallback(
    (d: IDate) => {
      if (
        d.date === date.getDate() &&
        d.month === date.getMonth() &&
        d.year === date.getFullYear()
      ) {
        return true;
      }
      return false;
    },
    [date]
  );

  const onChangeMonth = (type: "prev" | "next") => {
    let newMonth = type === "prev" ? month - 1 : month + 1;

    setMonth(newMonth);

    if (newMonth < 0 || newMonth > 11) {
      const date = new Date(year, newMonth, new Date().getDate());

      setDate(date);

      setMonth(date.getMonth());

      setYear(date.getFullYear());
    } else setDate(new Date());
  };

  const onSelectDate = (d: IDate) => {
    if (d.month < month || d.month > month) {
      setDate(d.fullDate);

      setMonth(d.fullDate.getMonth());

      setYear(d.fullDate.getFullYear());
    } else setDate(d.fullDate);

    handleChange(d);
  };

  const onSelectMonth = (m: number) => setMonth(m);

  const onSelectYear = (y: number) => setYear(y);

  return (
    <div
      className={`datepicker-calendar ${
        isDropdown ? "datepicker-calendar-active" : ""
      } ${isBottom ? "datepicker-calendar-bottom" : ""}`}
    >
      <DatePickerCalendarHeader
        months={months}
        month={month}
        years={years}
        year={year}
        onChangeMonth={onChangeMonth}
        onSelectMonth={onSelectMonth}
        onSelectYear={onSelectYear}
      />

      <DatePickerCalendarDay days={days} />

      <DatePickerCalendarDate
        dateRange={dateRange}
        isSelectedDate={isSelectedDate}
        onSelectDate={onSelectDate}
      />
    </div>
  );
};

export default DatePickerCalendar;
