import React from 'react';

import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';

import Header from './components/Header/Header';
import GeolocationRequest from './routes/GeolocationRequest';
import LoginPage from './routes/LoginPage';
import AccessConfirmation from './routes/AccessConfirmation';
import FreightOrders from './routes/FreightOrders';
import FreightOrderDetails from './routes/FreightOrderDetails';
import FreightOrederRegistration from './routes/FreightOrderRegistration';
import EarlyOrderSign from './routes/EarlyOrderSign';

import routes from './routes/routes';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
			<Header />
      <main>
				<Routes>
					<Route path={routes.geolocationRequest()} element={<GeolocationRequest />} />
					<Route path={routes.loginPage()} element={<LoginPage />} />
					<Route path={routes.accessConfirmation()} element={<AccessConfirmation />} />
					<Route path={routes.freightOrders()} element={<FreightOrders />} />
					<Route path={routes.freightOrderDetails()} element={<FreightOrderDetails />} />
					<Route path={routes.freightOrederRegistration()} element={<FreightOrederRegistration />} />
					<Route path={routes.earlyOrderSign()} element={<EarlyOrderSign />} />
				</Routes>
			</main>
    </BrowserRouter>
  )
}

export default App;
