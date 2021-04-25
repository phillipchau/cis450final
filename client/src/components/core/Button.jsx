import styled from 'styled-components';

export const Button = styled.button`
  margin: 1rem 0;
  padding: 0.25rem 1rem;
  background: ${({ theme }) => theme.colors.lightBlue};
  border-radius: 0.25rem;
  border: none;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;

  &:hover {
    background: ${({ theme }) => theme.colors.lightBlueEmphasis};
  }
`;

export const TopMarginButton = styled(Button)`
  margin: 1rem 0 0 0;
`;

