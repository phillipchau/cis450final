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
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  font-weight: bold;
`;

export const TableBody = styled.tbody`
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
`;

export const TableRowElement = styled.tr`
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tableBorder};

  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.tableBackground};
  }

  &:last-of-type {
    border-bottom: 2px solid ${({ theme }) => theme.colors.blue};
  }

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const TableHeadElement = styled.th`
  padding: 12px 15px;
  color: ${({ theme }) => theme.colors.white};
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
