import React from 'react';
import './App.css';
import Header from './components/Header';
import { Provider } from 'react-redux';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/Graph/LineGraph';
import configureStore from './redux/configureStore';
import { Card, CardContent } from '@material-ui/core';
import "leaflet/dist/leaflet.css";

const store = configureStore();

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <div className="app-left">
          <Header />
          <div className="app-stats">
            <InfoBox />
          </div>
          <Map casesType="cases" />
        </div>

        <Card className="app-right">
          <CardContent>
            <h2>Top 15 Live Cases by Country</h2>
            {/* Table */}
            <Table />

            <h2 className="worldwide-new-cases">Worldwide new cases</h2>
            {/* Graph */}
            <LineGraph />

          </CardContent>
        </Card>
      </div>
    </Provider>
  );
}

export default App;
