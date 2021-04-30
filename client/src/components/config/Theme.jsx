import React from 'react';
import { ThemeProvider } from 'styled-components';

export const ThemeConfig = {
  colors: {
    text: '#444',
    background: '#f0f4f8',
    tableBorder: '#dddddd',
    tableBackground: '#f3f3f3',
    lightBlue: '#96CDFF',
    lightBlueEmphasis: '#70BAFF',
    lightBlueBackground: '#e6f1fc',
    navbarBlue: '#bbdcfb',
    blue: '#3E93CD',
    darkBlue: '#2E7DB2',
    lightRed: '#fababa',
    lightRedEmphasis: '#ffa4a4',
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

const Theme = ({ children }) => (
  <ThemeProvider theme={ThemeConfig}>{children}</ThemeProvider>
);

export default Theme;
