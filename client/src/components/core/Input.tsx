function dateRangeInput() {
  return (
    <>
      <h5>Date Range</h5>
      <label htmlFor="start-date-input">Start</label>
      <div>
        <input type="date" value="2011-08-19" id="start-date-input" />
      </div>
      <label htmlFor="end-date-input" >End</label>
      <div>
        <input type="date" value="2011-08-19" id="end-date-input" />
      </div>
    </>
  );
}

export default dateRangeInput;