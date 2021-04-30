import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.medium};
  padding: 0.25rem 1rem;

  &:hover {
    text-decoration: none;
    color: inherit;
    background: ${({ theme }) => theme.colors.navbarBlue};
    border-radius: 0.25rem;
  }

  @media (max-width: 1000px) {
    padding: 0.25rem 0.25rem;
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
`;
