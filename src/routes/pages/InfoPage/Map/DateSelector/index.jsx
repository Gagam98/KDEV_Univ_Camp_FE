import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import calendarIcon from "@/assets/calendar.png";
import styles from "./DateSelector.module.css";

const DateSelector = ({ onDateRangeChange, onIntervalChange }) => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(60);
  const [selectedOption, setSelectedOption] = useState("Custom");

  const predefinedRanges = {
    "All time": [new Date(2025, 0, 1), new Date()],
    "Last week": [
      new Date(new Date().setDate(new Date().getDate() - 7)),
      new Date(),
    ],
    "Last 30 days": [
      new Date(new Date().setDate(new Date().getDate() - 30)),
      new Date(),
    ],
  };

  const handleDateRangeChange = (option) => {
    setSelectedOption(option);
    setDateRange(predefinedRanges[option] || dateRange);
    onDateRangeChange(predefinedRanges[option] || dateRange);
  };

  const handleDateChange = (date) => {
    setDateRange(date);
    onDateRangeChange(date);
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
          {dateRange[0].toLocaleDateString()} -{" "}
          {dateRange[1].toLocaleDateString()}
        </span>
      </div>

      {showPopup && (
        <div className={styles.popupContainer}>
          <div className={styles.dropdownWrapper}>
            <select
              value={selectedOption}
              onChange={(e) => handleDateRangeChange(e.target.value)}
            >
              <option value="All time">전체시간</option>
              <option value="Last week">지난 일주일</option>
              <option value="Last 30 days">지난 한 달</option>
              <option value="Custom">사용자 지정</option>
            </select>
          </div>

          <div className={styles.dropdownWrapper}>
            <select
              value={selectedInterval}
              onChange={(e) => handleIntervalChange(parseInt(e.target.value))}
            >
              <option value={60}>60초</option>
              <option value={120}>120초</option>
              <option value={180}>180초</option>
            </select>
          </div>

          <div className={styles.calendarWrapper}>
            <Calendar
              onChange={handleDateChange}
              value={dateRange}
              selectRange
              tileClassName={({ date, view }) => {
                if (date >= dateRange[0] && date <= dateRange[1]) {
                  return date.getTime() === dateRange[0].getTime() ||
                    date.getTime() === dateRange[1].getTime()
                    ? styles.selectedDateBlack
                    : styles.selectedDateGray;
                }
                return null;
              }}
            />
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
