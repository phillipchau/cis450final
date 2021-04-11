import React from 'react';
import { ThemeProvider } from 'styled-components';

export const ThemeConfig: any = {
  colors: {
    text: '#444',
    background: '#f0f4f8',
    tableBorder: '#dddddd',
    tableBackground: '#f3f3f3',
    lightBlue: '#AED2EA',
    blue: '#3E93CD',
    darkBlue: '#2E7DB2',
    red: 'red',
    gray: 'gray',
    lightGray: 'lightgray',
    white: 'white',
  },
  font: 'Roboto',
  fontSize: {
    small: '0.6rem',
    default: '1rem',
    medium: '1.2rem',
    large: '1.8rem',
  },
};

export type ThemeType = typeof ThemeConfig;

const Theme = ({ children }: any) => (
  <ThemeProvider theme={ThemeConfig}>{children}</ThemeProvider>
);

export default Theme;
