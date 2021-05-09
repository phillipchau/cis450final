import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { TypeCount } from '../../api/StateCount';
import { Ethnicities } from '../../api/CaseDemographics';
import { Button } from './Button';
import StyledMultiSelect from './Select';
import { ChildFlexContainer } from './Container';
import getFormattedDate from '../../util/Utility';
import { Text, SubHeaderText } from './Text';
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

export const PlotOptionsTab = Object.freeze({ STATES: 'States', DEMOGRAPHICS: 'Demographics' });

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
const plotFirstDay = new Date(2020, 0, 20);
const plotLastDay = new Date(2021, 3, 1);

export function PlotOptionsSidebar(params) {
  // Specifies the parameters in the options sidebar.
  const [optionsTab, setOptionsTab] = useState(PlotOptionsTab.STATES);

  // Hold error text.
  const [error, setError] = useState('');

  /**
   * States Tab
   */

  // Specifies whether the plot holds cases or deaths information.
  const [typeCountStates, setTypeCountStates] = useState(TypeCount.CASES);

  // Hold the starting and ending dates.
  const [startDateStates, setStartDateStates] = useState(plotFirstDay);
  const [endDateStates, setEndDateStates] = useState(plotLastDay);

  // The states to be shown on the plot.
  const [selectedStates, setSelectedStates] = useState([]);

  /**
   * Demographics Tab
   */

  // Specifies whether the plot holds cases or deaths information.
  const [typeCountDemographics, setTypeCountDemographics] = useState(TypeCount.CASES);

  // Specifies the ethnicity that the plot describes.
  const [ethnicity, setEthnicity] = useState(Ethnicities.HISPANIC);

  // Hold the starting and ending dates.
  const [startDateDemographics, setStartDateDemographics] = useState(plotFirstDay);
  const [endDateDemographics, setEndDateDemographics] = useState(plotLastDay);

  // When the options are set, select all the states.
  useEffect(() => {
    if (params.selectedStatesOptions.length > 0) {
      setSelectedStates(params.selectedStatesOptions);
    }
  }, [params.selectedStatesOptions]);

  // Display the state count tab.
  if (optionsTab === PlotOptionsTab.STATES) {
    return (
      <ChildFlexContainer
        flex={3}
      >
        <OptionsTabContainer>
          <OptionsTabText
            onClick={() => setOptionsTab(PlotOptionsTab.STATES)}
            enabled={optionsTab === PlotOptionsTab.STATES}
          >
            {PlotOptionsTab.STATES}
          </OptionsTabText>
          <OptionsTabText
            onClick={() => setOptionsTab(PlotOptionsTab.DEMOGRAPHICS)}
            enabled={optionsTab === PlotOptionsTab.DEMOGRAPHICS}
          >
            {PlotOptionsTab.DEMOGRAPHICS}
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
          if (newDate >= plotFirstDay && newDate <= plotLastDay && newDate <= endDateStates) {
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
          if (newDate >= plotFirstDay && newDate <= plotLastDay && newDate >= startDateStates) {
            setEndDateStates(newDate);
          } else {
            setError('The date must have data in the database and be after the starting date.');
          }
        }} />
  
        <br></br>
        <h5>Filters</h5>
        <SubHeaderText>Count Type</SubHeaderText>
        <MinimalLabel>
          Count Cases
          <InlineInput
            name="Count Cases"
            type="checkbox"
            checked={typeCountStates === TypeCount.CASES}
            onChange={() => setTypeCountStates(TypeCount.CASES)}
          />
        </MinimalLabel>
        <MinimalLabel>
          Count Deaths
          <InlineInput
            name="Count Deaths"
            type="checkbox"
            checked={typeCountStates === TypeCount.DEATHS}
            onChange={() => setTypeCountStates(TypeCount.DEATHS)}
          />
        </MinimalLabel>
        <Button 
          onClick={() => {
            if (selectedStates.length === 0) {
              setError('There must be at least one selected state.');
            } else {
              setError('');
              params.onStatesSubmit(optionsTab, typeCountStates, startDateStates, endDateStates, selectedStates);
            }
          }}
        >
          Submit
        </Button>
      </ChildFlexContainer>
    );
  } else if (optionsTab === PlotOptionsTab.DEMOGRAPHICS) {
    return (
      <ChildFlexContainer
        flex={3}
      >
        <OptionsTabContainer>
          <OptionsTabText
            onClick={() => setOptionsTab(PlotOptionsTab.STATES)}
            enabled={optionsTab === PlotOptionsTab.STATES}
          >
            {PlotOptionsTab.STATES}
          </OptionsTabText>
          <OptionsTabText
            onClick={() => setOptionsTab(PlotOptionsTab.DEMOGRAPHICS)}
            enabled={optionsTab === PlotOptionsTab.DEMOGRAPHICS}
          >
            {PlotOptionsTab.DEMOGRAPHICS}
          </OptionsTabText>
        </OptionsTabContainer>
        { error ? <ErrorMessage message={error} /> : null }

        <h5>Date Range</h5>
  
        <Label>Start</Label>
        <Input type="date" value={getFormattedDate(startDateDemographics)} onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= plotFirstDay && newDate <= plotLastDay && newDate <= endDateStates) {
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
          if (newDate >= plotFirstDay && newDate <= plotLastDay && newDate >= startDateStates) {
            setEndDateDemographics(newDate);
          } else {
            setError('The date must have data in the database and be after the starting date.');
          }
        }} />

        <br></br>
        <h5>Filters</h5>
        <SubHeaderText>Count Type</SubHeaderText>
        <MinimalLabel>
          Count Cases
          <InlineInput
            name="Count Cases"
            type="checkbox"
            checked={typeCountDemographics === TypeCount.CASES}
            onChange={() => setTypeCountDemographics(TypeCount.CASES)}
          />
        </MinimalLabel>
        <MinimalLabel>
          Count Deaths
          <InlineInput
            name="Count Deaths"
            type="checkbox"
            checked={typeCountDemographics === TypeCount.DEATHS}
            onChange={() => setTypeCountDemographics(TypeCount.DEATHS)}
          />
        </MinimalLabel>
        <SubHeaderText>Ethnicities</SubHeaderText>
        { Object.values(Ethnicities).map((ethnicityType, index) => {
            return (
              <MinimalLabel
                key={ethnicityType}
              >
                {ethnicityType}
                <InlineInput
                  name={ethnicityType}
                  type="checkbox"
                  checked={ethnicity === ethnicityType}
                  onChange={() => setEthnicity(ethnicityType)}
                />
              </MinimalLabel>
            );
          })
        }
        <Button 
          onClick={() => {
            setError('');
            params.onDemographicsSubmit(optionsTab, typeCountDemographics, ethnicity, startDateDemographics, endDateDemographics);
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

export const VaccineOptionsTab = Object.freeze({ STATE: 'State', OVERALL: 'Overall' });

// These are the dates available in the Vaccine database.
const vaccineFirstDay = new Date(2021, 0, 12);
const vaccineLastDay = new Date(2021, 3, 1);

export function VaccineOptionsSidebar(params) {
  // Specifies the parameters in the options sidebar.
  const [optionsTab, setOptionsTab] = useState(VaccineOptionsTab.STATE);

  // Hold error text.
  const [error, setError] = useState('');

  /**
   * State Tab
   */

  // Hold the starting and ending dates.
  const [startDateState, setStartDateState] = useState(vaccineFirstDay);
  const [endDateState, setEndDateState] = useState(vaccineLastDay);

  // The selected state to show on the plot.
  const [selectedState, setSelectedState] = useState('');

  /**
   * Overall Tab
   */

  // The states to be shown on the plot.
  const [selectedStates, setSelectedStates] = useState([]);

  // When the options are set, select all the states.
  useEffect(() => {
    if (params.selectedStatesOptions.length > 0) {
      setSelectedStates(params.selectedStatesOptions);
    }
  }, [params.selectedStatesOptions]);

  // Display the state tab.
  if (optionsTab === VaccineOptionsTab.STATE) {
    return (
      <ChildFlexContainer
        flex={3}
      >
        <OptionsTabContainer>
          <OptionsTabText
            onClick={() => setOptionsTab(VaccineOptionsTab.STATE)}
            enabled={optionsTab === VaccineOptionsTab.STATE}
          >
            {VaccineOptionsTab.STATE}
          </OptionsTabText>
          <OptionsTabText
            onClick={() => setOptionsTab(VaccineOptionsTab.OVERALL)}
            enabled={optionsTab === VaccineOptionsTab.OVERALL}
          >
            {VaccineOptionsTab.OVERALL}
          </OptionsTabText>
        </OptionsTabContainer>
        { error ? <ErrorMessage message={error} /> : null }

        <h5>Selected State</h5>
        {
          params.distinctStates ? (
            // TODO: Get value of the select, perhaps onchange attach.
            <select name="State">
              {
                params.distinctStates.map((state, index) => {
                  <option value={state} id={state}>{state}</option>
                })
              }
            </select>
          ) : null
        }
        
        <h5>Date Range</h5>
  
        <Label>Start</Label>
        <Input type="date" value={getFormattedDate(startDateState)} onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= vaccineFirstDay && newDate <= vaccineLastDay && newDate <= endDateState) {
            setStartDateState(newDate);
          } else {
            setError('The date must have data in the database and be before the ending date.');
          }
        }} />
  
        <Label>End</Label>
        <Input type="date" value={getFormattedDate(endDateState)} onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= vaccineFirstDay && newDate <= vaccineLastDay && newDate >= startDateState) {
            setEndDateState(newDate);
          } else {
            setError('The date must have data in the database and be after the starting date.');
          }
        }} />
  
        <br></br>
        <Button 
          onClick={() => {
            setError('');
            params.onStatesSubmit(optionsTab, startDateState, endDateState, selectedState);
          }}
        >
          Submit
        </Button>
      </ChildFlexContainer>
    );
  } else if (optionsTab === VaccineOptionsTab.OVERALL) {
    return (
      <ChildFlexContainer
        flex={3}
      >
        <OptionsTabContainer>
          <OptionsTabText
            onClick={() => setOptionsTab(VaccineOptionsTab.STATE)}
            enabled={optionsTab === VaccineOptionsTab.STATE}
          >
            {VaccineOptionsTab.STATE}
          </OptionsTabText>
          <OptionsTabText
            onClick={() => setOptionsTab(VaccineOptionsTab.OVERALL)}
            enabled={optionsTab === VaccineOptionsTab.OVERALL}
          >
            {VaccineOptionsTab.OVERALL}
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
        
        <Button 
          onClick={() => {
            setError('');
            params.onDemographicsSubmit(optionsTab, typeCountDemographics, ethnicity, startDateDemographics, endDateDemographics);
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
