import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.medium};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const TextLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.default};
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
`;

export const TextBlockLink = styled(Link)`
  display: block;
  margin: 1rem;
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;

  &:hover {
    font-weight: 700;
  }
`;
