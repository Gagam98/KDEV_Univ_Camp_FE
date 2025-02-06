import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import calendarIcon from "@/assets/calendar.png";
import "@@/InfoPage/Map/Date/Date.css";

const DateSelector = ({ onDateRangeChange, onIntervalChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCalendars, setShowCalendars] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(60);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange({ startDate: date, endDate });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange({ startDate, endDate: date });
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    onIntervalChange(interval);
  };

  const toggleCalendars = () => {
    setShowCalendars(!showCalendars);
  };

  return (
    <div className="date-selector">
      <div className="date-display" onClick={toggleCalendars}>
        <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" />
        <span className="selected-date">
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </span>
      </div>
      <div className="interval-selector">
        <select
          value={selectedInterval}
          onChange={(e) => handleIntervalChange(parseInt(e.target.value, 10))}
        >
          <option value={60}>60초</option>
          <option value={120}>120초</option>
          <option value={180}>180초</option>
        </select>
      </div>
      {showCalendars && (
        <div className="calendar-popup">
          <div className="calendar-wrapper">
            <div className="calendar-item">
              <h4>Start Date</h4>
              <Calendar onChange={handleStartDateChange} value={startDate} />
            </div>
            <div className="calendar-item">
              <h4>End Date</h4>
              <Calendar onChange={handleEndDateChange} value={endDate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
