import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import calendarIcon from "@/assets/calendar.png";
import styles from "./DateSelector.module.css";

const DateSelector = ({ onDateRangeChange, onIntervalChange }) => {
  const [dateRange, setDateRange] = useState(["", ""]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(60);

  const handleDateChange = (date) => {
    if (Array.isArray(date) && date.length === 2) {
      setDateRange(date);
      onDateRangeChange([
        date[0]?.toISOString().split("T")[0],
        date[1]?.toISOString().split("T")[0],
      ]);
    }
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    onIntervalChange(interval);
  };

  return (
    <div className={styles.dateSelector}>
      <div
        className={styles.dateDisplay}
        onClick={() => setShowPopup(!showPopup)}
      >
        <img
          src={calendarIcon}
          alt="Calendar Icon"
          className={styles.smallCalendarIcon}
        />
        <span className={styles.selectedDate}>
          {dateRange[0] && dateRange[1]
            ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
            : "날짜 선택"}
        </span>
      </div>

      {showPopup && (
        <div className={styles.popupContainer}>
          <div className={styles.calendarWrapper}>
            <Calendar
              onChange={handleDateChange}
              value={dateRange}
              selectRange
              tileClassName={({ date }) => {
                if (dateRange[0] && dateRange[1]) {
                  if (date >= dateRange[0] && date <= dateRange[1]) {
                    return date.getTime() === dateRange[0].getTime() ||
                      date.getTime() === dateRange[1].getTime()
                      ? styles.selectedDateBlack
                      : styles.selectedDateGray;
                  }
                }
                return null;
              }}
            />
          </div>

          <div className={styles.dropdownWrapper}>
            <label>검색 주기 (초)</label>
            <select
              value={selectedInterval}
              onChange={(e) => handleIntervalChange(parseInt(e.target.value))}
            >
              <option value={60}>60초</option>
              <option value={120}>120초</option>
              <option value={180}>180초</option>
            </select>
          </div>

          <div className={styles.buttonWrapper}>
            <button
              className={styles.cancelButton}
              onClick={() => setShowPopup(false)}
            >
              취소
            </button>
            <button
              className={styles.applyButton}
              onClick={() => setShowPopup(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
