import styled from "styled-components";

export const TableElement = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 0.9em;
  min-width: 400px;
  max-height: 800px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

export const TableHead = styled.thead`
  background-color: #009879;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
`;

export const TableBody = styled.tbody`
  color: #ffffff;
  text-align: left;
`;

export const TableRowElement = styled.tr`
  color: #444;
  text-align: left;
  border-bottom: 1px solid #dddddd;

  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  &:last-of-type {
    border-bottom: 2px solid #009879;
  }

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const TableHeadElement = styled.th`
  padding: 12px 15px;
  color: #ffffff;
`;

export const TableDataElement = styled.td`
  padding: 12px 15px;

  &:first-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
