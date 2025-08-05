import React from 'react';

const MonthSelector = ({ currentMonth, onMonthChange, months }) => {
  return (
    <div className="controls">
      {months.map((month, index) => (
        <button
          key={month}
          className={`month-btn ${currentMonth === index ? 'active' : ''}`}
          onClick={() => onMonthChange(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default MonthSelector; 