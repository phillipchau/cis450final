import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { TypeCount } from '../../api/StateCount';
import { Ethnicities } from '../../api/CaseDemographics';
import { Button } from './Button';
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

  // Hold error text.
  const [error, setError] = useState('');

  /**
   * States Tab
   */

  // Specifies whether the plot holds cases or deaths information.
  const [typeCount, setTypeCount] = useState(TypeCount.CASES);

  // Hold the starting and ending dates.
  const [startDateStates, setStartDateStates] = useState(firstDay);
  const [endDateStates, setEndDateStates] = useState(lastDay);

  // The states to be shown on the plot.
  const [selectedStates, setSelectedStates] = useState([]);

  /**
   * Demographics Tab
   */

  // Specifies the ethnicity that the plot describes.
  const [ethnicity, setEthnicity] = useState(Ethnicities.HISPANIC);

  // Hold the starting and ending dates.
  const [startDateDemographics, setStartDateDemographics] = useState(firstDay);
  const [endDateDemographics, setEndDateDemographics] = useState(lastDay);

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
        <Input type="date" value={getFormattedDate(startDateStates)} onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= firstDay && newDate <= lastDay && newDate <= endDateStates) {
            setStartDateStates(newDate);
          } else {
            setError('The date must have data in the database and be before the ending date.');
          }
        }} />
  
        <Label>End</Label>
        <Input type="date" value={getFormattedDate(endDateStates)} onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= firstDay && newDate <= lastDay && newDate >= startDateStates) {
            setEndDateStates(newDate);
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
              params.onSubmit(typeCount, startDateStates, endDateStates, selectedStates);
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

        <h5>Date Range</h5>
  
        <Label>Start</Label>
        <Input type="date" value={getFormattedDate(startDateDemographics)} onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= firstDay && newDate <= lastDay && newDate <= endDateStates) {
            setStartDateDemographics(newDate);
          } else {
            setError('The date must have data in the database and be before the ending date.');
          }
        }} />
  
        <Label>End</Label>
        <Input type="date" value={getFormattedDate(endDateDemographics)} onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= firstDay && newDate <= lastDay && newDate >= startDateStates) {
            setEndDateDemographics(newDate);
          } else {
            setError('The date must have data in the database and be after the starting date.');
          }
        }} />

        <br></br>
        <h5>Filters</h5>
        <MinimalLabel>
          Hispanic
          <InlineInput
            name="Hispanic"
            type="checkbox"
            checked={ethnicity === Ethnicities.HISPANIC}
            onChange={() => setEthnicity(Ethnicities.HISPANIC)}
          />
        </MinimalLabel>
        <MinimalLabel>
          White
          <InlineInput
            name="White"
            type="checkbox"
            checked={ethnicity === Ethnicities.WHITE}
            onChange={() => setEthnicity(Ethnicities.WHITE)}
          />
        </MinimalLabel>
        <MinimalLabel>
          Black
          <InlineInput
            name="Black"
            type="checkbox"
            checked={ethnicity === Ethnicities.BLACK}
            onChange={() => setEthnicity(Ethnicities.BLACK)}
          />
        </MinimalLabel>
        <MinimalLabel>
          Native
          <InlineInput
            name="Native"
            type="checkbox"
            checked={ethnicity === Ethnicities.NATIVE}
            onChange={() => setEthnicity(Ethnicities.NATIVE)}
          />
        </MinimalLabel>
        <MinimalLabel>
          Asian
          <InlineInput
            name="Asian"
            type="checkbox"
            checked={ethnicity === Ethnicities.ASIAN}
            onChange={() => setEthnicity(Ethnicities.ASIAN)}
          />
        </MinimalLabel>
        <MinimalLabel>
          Pacific
          <InlineInput
            name="Pacific"
            type="checkbox"
            checked={typeCount === TypeCount.PACIFIC}
            onChange={() => setTypeCount(TypeCount.PACIFIC)}
          />
        </MinimalLabel>
        <Button 
          onClick={() => {
            if (selectedStates.length === 0) {
              setError('There must be at least one selected state.');
            } else {
              setError('');
              params.onSubmit(typeCount, startDateStates, endDateStates, selectedStates);
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
