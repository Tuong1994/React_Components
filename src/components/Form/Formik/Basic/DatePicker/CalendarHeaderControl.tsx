import React from "react";
import { FaAngleDown } from "react-icons/fa";
import useClickOutside from "@/common/hooks/useClickOutside";
import useRender from "@/common/hooks/useRender";

interface DatePickerCalendarHeaderControlProps {
  months: string[];
  years: number[];
  month: number;
  year: number;
  onSelectMonth: (m: number) => void;
  onSelectYear: (y: number) => void;
}

const DatePickerCalendarHeaderControl: React.FC<
  DatePickerCalendarHeaderControlProps
> = ({ months, month, years, year, onSelectMonth, onSelectYear }) => {
  const [isOpenMonth, setIsOpenMonth] = React.useState<boolean>(false);

  const [isOpenYear, setIsOpenYear] = React.useState<boolean>(false);

  const monthSelectRef = React.useRef<HTMLDivElement | null>(null);

  const yearSelectRef = React.useRef<HTMLDivElement | null>(null);

  const renderMonths = useRender(isOpenMonth);

  const renderYears = useRender(isOpenYear);

  useClickOutside(monthSelectRef, setIsOpenMonth);

  useClickOutside(yearSelectRef, setIsOpenYear);

  const onDropdownMonth = () => setIsOpenMonth(!isOpenMonth);

  const onDropdownYear = () => setIsOpenYear(!isOpenYear);

  return (
    <div className="header-control">
      <div
        ref={monthSelectRef}
        className="control-select"
        onClick={onDropdownMonth}
      >
        <div className="select-view">
          <span>{months[month]}</span>
          <FaAngleDown className="view-icon" />
        </div>

        {renderMonths && (
          <div
            className={`select-option ${
              isOpenMonth ? "select-option-active" : ""
            }`}
          >
            {months.map((month, idx) => (
              <div
                key={idx}
                className="option-item"
                onClick={() => onSelectMonth(idx)}
              >
                {month}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        ref={yearSelectRef}
        className="control-select"
        onClick={onDropdownYear}
      >
        <div className="select-view">
          <span>{year}</span>
          <FaAngleDown className="view-icon" />
        </div>

        {renderYears && (
          <div
            className={`select-option ${
              isOpenYear ? "select-option-active" : ""
            }`}
          >
            {years.map((year, idx) => (
              <div
                key={idx}
                className="option-item"
                onClick={() => onSelectYear(year)}
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerCalendarHeaderControl;
