import styled from 'styled-components';

export const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.default};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;

export const LargeText = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const LandingHeaderText = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const ErrorText = styled(Text)`
   color: ${({ theme }) => theme.colors.red};
`;
