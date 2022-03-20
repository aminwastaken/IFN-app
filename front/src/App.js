import React from 'react';
import {
  Grid,
} from '@material-ui/core';

import {
  Provider
} from 'react-redux';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import store from './store';

import SelectTownship from './components/SelectTownship/SelectTownship';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//22577A 38A3A5 57CC99 80ED99 C7F9CC
const theme = createMuiTheme({
  palette: {
    accentTwo: {
      main: '#57CC99',
      contrastText: '#000',
    },
    secondary: {
      main: '#80ED99',
      contrastText: '#000',
    },
    tertiary: {
      main: '#38A3A5',
      contrastText: '#000',
    },
    accentOne: {
      main: '#C7F9CC',
      contrastText: '#000',
    },
    primary: {
      main: '#22577A',
      contrastText: '#FFF',
    },
    negative: {
      main: '#FA8072',
      contrastText: '#FFF',
    },
    average: {
      main: '#FADA5E',
      contrastText: '#000',
    }
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grid container item xs={12} style={{justifyContent: 'center', marginTop: '20px'}}>
          <Grid container item xs={8}>
            <Header />
            <SelectTownship />
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
