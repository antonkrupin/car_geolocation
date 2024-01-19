import React from 'react';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';
import CityMap from './components/CityMap/CityMap';

import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <Form />
			<ErrorBlock />
      <CityMap />
    </>
  )
}

export default App;
