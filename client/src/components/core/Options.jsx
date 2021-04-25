import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { TypeCount } from '../../api/StateCount';
import Button from './Button';
import StyledMultiSelect from './Select';
import { ChildFlexContainer } from './Container';
import getFormattedDate from '../../util/Utility';
import { Text } from './Text';
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

const OptionsTab = Object.freeze({ STATES: 'States', DEMOGRAPHICS: 'Demographics' });

const OptionsTabContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const OptionsTabText = styled(Text)`
  display: inline-block;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightBlue};
  padding: 0.1rem 0.2rem;
  background: ${({ enabled, theme }) => (enabled ? theme.colors.lightBlueBackground : theme.colors.white)};
  border-radius: 5px 5px 0 0;

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.lightBlueEmphasis};
  }
`;

// These are the dates available in the COVID database.
const firstDay = new Date(2020, 0, 20);
const lastDay = new Date(2021, 3, 1);

function OptionsSidebar(params) {
  // Specifies the parameters in the options sidebar.
  const [optionsTab, setOptionsTab] = useState(OptionsTab.STATES);

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

  // Display the state count tab.
  if (optionsTab === OptionsTab.STATES) {
    return (
      <ChildFlexContainer
        flex={3}
      >
        <OptionsTabContainer>
          <OptionsTabText
            onClick={() => setOptionsTab(OptionsTab.STATES)}
            enabled={optionsTab === OptionsTab.STATES}
          >
            {OptionsTab.STATES}
          </OptionsTabText>
          <OptionsTabText
            onClick={() => setOptionsTab(OptionsTab.DEMOGRAPHICS)}
            enabled={optionsTab === OptionsTab.DEMOGRAPHICS}
          >
            {OptionsTab.DEMOGRAPHICS}
          </OptionsTabText>
        </OptionsTabContainer>
        { error ? <ErrorMessage message={error} /> : null }
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
        <Button 
          onClick={() => {
            if (selectedStates.length === 0) {
              setError('There must be at least one selected state.');
            } else {
              setError('');
              params.onSubmit(typeCount, startDate, endDate, selectedStates);
            }
          }}
        >
          Submit
        </Button>
      </ChildFlexContainer>
    );
  } else if (optionsTab === OptionsTab.DEMOGRAPHICS) {
    return (
      <ChildFlexContainer
        flex={3}
      >
        <OptionsTabContainer>
          <OptionsTabText
            onClick={() => setOptionsTab(OptionsTab.STATES)}
            enabled={optionsTab === OptionsTab.STATES}
          >
            {OptionsTab.STATES}
          </OptionsTabText>
          <OptionsTabText
            onClick={() => setOptionsTab(OptionsTab.DEMOGRAPHICS)}
            enabled={optionsTab === OptionsTab.DEMOGRAPHICS}
          >
            {OptionsTab.DEMOGRAPHICS}
          </OptionsTabText>
        </OptionsTabContainer>
        <Button 
          onClick={() => {
            if (selectedStates.length === 0) {
              setError('There must be at least one selected state.');
            } else {
              setError('');
              params.onSubmit(typeCount, startDate, endDate, selectedStates);
            }
          }}
        >
          Submit
        </Button>
      </ChildFlexContainer>
    )
  } else {
    return (
      <ChildFlexContainer
        flex={3}
      >
        <ErrorMessage message={'This is an invalid tab, return to a previous setting.'} />
      </ChildFlexContainer>
    )
  }

  
}

export default OptionsSidebar;
