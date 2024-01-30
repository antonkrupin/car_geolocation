import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StartPage from "./routes/StartPage/StartPage";
import GeolocationAccess from "./routes/GeolocationAccess/GeolocationAccess";
import LoginPage from "./routes/LoginPage/LoginPage";
import AccessConfirmation from "./routes/AccessConfirmation/AccessConfirmation";
import PersonalDataConfirmation from "./routes/PersonalDataConfirmation/PersonalDataConfirmation";
import FreightOrders from "./routes/FreightOrders/FreightOrders";
import FreightOrderDetails from "./routes/FreightOrderDetails/FreightOrderDetails";
import FreightOrederRegistration from "./routes/FreightOrderRegistration/FreightOrderRegistration";

import routes from "./routes/routes";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path={routes.startPage()} element={<StartPage />} />
          <Route
            path={routes.geolocationAccess()}
            element={<GeolocationAccess />}
          />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route
            path={routes.accessConfirmation()}
            element={<AccessConfirmation />}
          />
          <Route
            path={routes.personalDataConfirmation()}
            element={<PersonalDataConfirmation />}
          />
          <Route path={routes.freightOrders()} element={<FreightOrders />} />
          <Route
            path={routes.freightOrderDetails()}
            element={<FreightOrderDetails />}
          />
          <Route
            path={routes.freightOrederRegistration()}
            element={<FreightOrederRegistration />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
