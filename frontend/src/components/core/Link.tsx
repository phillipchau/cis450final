import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.mediumLarge};
  text-decoration: none;
`;

export const TextLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.default};
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
`;

export const TextBlockLink = styled(Link)`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.default};
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
`;
