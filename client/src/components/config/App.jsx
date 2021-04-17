import React from 'react';
import { Switch } from 'react-router-dom';
import MainLayout from '../layout/Main';
import MinimalLayout from '../layout/Minimal';
import LandingPage from '../../views/Landing';
import NotFound from '../../views/NotFound';
import CustomRoute from './Route';
import MapPage from '../../views/Map';
import PlotPage from '../../views/Plot';
import MapContainer from '../../views/MapContainer';

function App() {
  return (
    <Switch>
      <CustomRoute path="/" component={LandingPage} layout={MainLayout} exact />
      <CustomRoute path="/map" component={MapContainer} layout={MainLayout} exact />
      <CustomRoute path="/plot" component={PlotPage} layout={MinimalLayout} exact />
      <CustomRoute path="*" component={NotFound} layout={MainLayout} />
    </Switch>
  );
}

export default App;
