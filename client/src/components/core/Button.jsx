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

export const NavbarButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin: 0;
  background: ${({ theme }) => theme.colors.lightRed};

  &:hover {
    background: ${({ theme }) => theme.colors.lightRedEmphasis};
  }
`;

export const TopMarginButton = styled(Button)`
  margin: 1rem 0 0 0;
`;

