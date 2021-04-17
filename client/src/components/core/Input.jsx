import React from 'react';

function DateRangeInput(startDate, setStartDate, endDate, setEndDate) {
  return (
    <>
      <h5>Date Range</h5>

      <label htmlFor="start-date-input">Start</label>
      <input type="date" value={startDate} id="start-date-input" onClick={(e) => setStartDate(e.target.value)} />

      <label htmlFor="end-date-input" >End</label>
      <input type="date" value={endDate} id="end-date-input" onClick={(e) => setEndDate(e.target.value)} />
    </>
  );
}

export default DateRangeInput;