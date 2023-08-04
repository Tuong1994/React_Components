import React from "react";
import { IDate } from "@/common/type/form";

interface DatePickerCalendarDateProps {
  dateRange: IDate[];
  isSelectedDate: (d: IDate) => boolean;
  onSelectDate: (d: IDate) => void;
}

const DatePickerCalendarDate: React.FC<DatePickerCalendarDateProps> = ({
  dateRange,
  isSelectedDate,
  onSelectDate,
}) => {
  return (
    <div className="calendar-date-month">
      {dateRange.map((d, idx) => (
        <div key={idx} className="date-item">
          <div
            className={`item-inner ${
              d.type === "sub" ? "item-inner-sub-date" : ""
            } ${isSelectedDate(d) ? "item-inner-active" : ""}`}
            onClick={() => onSelectDate(d)}
          >
            {d.date}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatePickerCalendarDate;
