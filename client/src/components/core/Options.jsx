import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { TypeCount } from '../../api/StateCount';
import Button from './Button';
import StyledMultiSelect from './Select';
import { ChildFlexContainer } from './Container';
import getFormattedDate from '../../util/Utility';
import ErrorMessage from './Error';

const Label = styled.label`
  display: block;
  margin: 1rem 0 0.25rem 0;
`;

const Input = styled.input`
  display: block;
`;

const MinimalLabel = styled.label`
  display: block;
  margin: 0.25rem 0;
`;

const InlineInput = styled.input`
  display: inline-block;
  margin-left: 5px;
`;

// These are the dates available in the COVID database.
const firstDay = new Date(2020, 0, 20);
const lastDay = new Date(2021, 3, 1);

function OptionsSidebar(params) {
  // Specifies whether the plot holds cases or deaths information.
  const [typeCount, setTypeCount] = useState(TypeCount.CASES);

  // Hold the starting and ending dates.
  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(lastDay);

  // Hold error text.
  const [error, setError] = useState('');

  // The states to be shown on the plot.
  const [selectedStates, setSelectedStates] = useState([]);

  // When the options are set, select all the states.
  useEffect(() => {
    if (params.selectedStatesOptions.length > 0) {
      setSelectedStates(params.selectedStatesOptions);
    }
  }, [params.selectedStatesOptions]);

  return (
    <ChildFlexContainer
      flex={3}
    >
      <h5>Selected States</h5>
      <StyledMultiSelect
        options={params.selectedStatesOptions}
        value={selectedStates}
        onChange={setSelectedStates}
        labelledBy="Select"
      />
      
      <h5>Date Range</h5>

      <Label>Start</Label>
      <Input type="date" value={getFormattedDate(startDate)} onChange={(e) => {
        setError('');
        let newDate = new Date(e.target.value);
        newDate.setDate(newDate.getDate() + 1);
        if (newDate >= firstDay && newDate <= lastDay && newDate <= endDate) {
          setStartDate(newDate);
        } else {
          setError('The date must have data in the database and be before the ending date.');
        }
      }} />

      <Label>End</Label>
      <Input type="date" value={getFormattedDate(endDate)} onChange={(e) => {
        setError('');
        let newDate = new Date(e.target.value);
        newDate.setDate(newDate.getDate() + 1);
        if (newDate >= firstDay && newDate <= lastDay && newDate >= startDate) {
          setEndDate(newDate);
        } else {
          setError('The date must have data in the database and be after the starting date.');
        }
      }} />

      <br></br>
      <h5>Filters</h5>
      <MinimalLabel>
        Count Cases
        <InlineInput
          name="Count Cases"
          type="checkbox"
          checked={typeCount === TypeCount.CASES}
          onChange={() => setTypeCount(TypeCount.CASES)}
        />
      </MinimalLabel>
      <MinimalLabel>
        Count Deaths
        <InlineInput
          name="Count Deaths"
          type="checkbox"
          checked={typeCount === TypeCount.DEATHS}
          onChange={() => setTypeCount(TypeCount.DEATHS)}
        />
      </MinimalLabel>
      <Button onClick={() => params.onSubmit(typeCount, startDate, endDate)}>Submit</Button>
      { error ? <ErrorMessage message={error} /> : null }
    </ChildFlexContainer>
  );
}

export default OptionsSidebar;
