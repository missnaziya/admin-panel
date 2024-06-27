import {
  BackendError,
  Lockscreen,
  NotFound,
  PasswordReset,
  Signin,
  Signup
} from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppProvider from "./components/AppProvider/AppProvider";
import Dashboard from "./containers/Dashboard";
import React from "react";
import registerServiceWorker from "./registerServiceWorker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { render } from "react-dom";



render(
  <AppProvider>
      <ToastContainer />
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/404" component={NotFound} />
        <Route exact path="/500" component={BackendError} />
        <Route exact path="/Lockscreen" component={Lockscreen} />
        <Route exact path="/forgot" component={PasswordReset} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById("root")
);

registerServiceWorker();
