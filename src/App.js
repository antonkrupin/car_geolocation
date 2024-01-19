import React from 'react';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';

import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <Form />
			<ErrorBlock />
    </>
  )
}

export default App;
