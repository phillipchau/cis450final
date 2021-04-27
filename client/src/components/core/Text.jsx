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

export const SubHeaderText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.default};
  margin: 0.5rem 0;
  font-weight: 700;
  text-decoration: underline;
`;

export const LoadingContainerText = styled(LandingHeaderText)`
  vertical-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ErrorText = styled(Text)`
   color: ${({ theme }) => theme.colors.red};
`;
