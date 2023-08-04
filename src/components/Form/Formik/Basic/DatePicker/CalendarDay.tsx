import React from "react";

interface DatePickerCalendarDayProps {
  days: string[];
}

const DatePickerCalendarDay: React.FC<DatePickerCalendarDayProps> = ({
  days,
}) => {
  return (
    <div className="calendar-day-week">
      {days.map((day, idx) => (
        <div key={idx} className="day-item">
          {day}
        </div>
      ))}
    </div>
  );
};

export default DatePickerCalendarDay;
