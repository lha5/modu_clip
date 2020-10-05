import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from '../hoc/auth';

import {Header} from 'grommet';

// pages
import LandingPage from './views/LandingPage/LandingPage';
import SignUpPage from "./views/SignUpPage/SignUpPage";
import LoginPage from "./views/LoginPage/LoginPage";
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';

import './css/app.css';

function App() {
  return (
      <Suspense fallback={(<div>Loading...</div>)}>
          <Header height="xsmall">
              <NavBar />
          </Header>
          <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/signup" component={Auth(SignUpPage, false)} />
          </Switch>
          <Footer />
      </Suspense>
  );
}

export default App;
