import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import calendarIcon from "@/assets/calendar.png";
import styles from "./DateSelector.module.css";

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
    <div className={styles.dateSelector}>
      <div className={styles.dateDisplay} onClick={toggleCalendars}>
        <img
          src={calendarIcon}
          alt="Calendar Icon"
          className={styles.calendarIcon}
        />
        <span className={styles.selectedDate}>
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </span>
      </div>
      <div className={styles.intervalSelector}>
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
        <div className={styles.calendarPopup}>
          <div className={styles.calendarWrapper}>
            <div className={styles.calendarItem}>
              <h4>Start Date</h4>
              <Calendar onChange={handleStartDateChange} value={startDate} />
            </div>
            <div className={styles.calendarItem}>
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
