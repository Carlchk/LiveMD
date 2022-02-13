import React from 'react'
import { Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import Editor from "./Editor";
import { createBrowserHistory } from 'history';
import { v4 as uuidV4 } from "uuid"
import File from "./File";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import Navbar from './component/LandingNavbar'
import Spinner from './component/Spinner'

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    render={(props) => {
      let Component = withAuthenticationRequired(component, {
        onRedirecting: () => <Spinner />,
      });
      return <Component {...props} />;
    }}
    {...args}
  />
);

const onRedirectCallback = (appState) => {
  history.replace(appState?.returnTo || window.location.pathname);
};

const PageNotFound = () => {
  return (<>Page Not Found</>)
}


const DefaultPathContainer = () => {
  return (<>
    <Navbar />
    <Route exact path="/" component={LandingPage} />
    <ProtectedRoute exact path="/files" component={File} />
    <ProtectedRoute exact path="/new"><Redirect to={`/editor/${uuidV4()}`} /></ProtectedRoute>
  </>)

}

function App() {
  const DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
  const CLIENTID = process.env.REACT_APP_AUTH0_CLIENT_ID

  document.title = "LiveMD"
  return (
    <Router history={history}>
      <Auth0Provider
        domain={DOMAIN}
        clientId={CLIENTID}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        audience={`https://${DOMAIN}/api/v2/`}
        scope="read:current_user update:current_user_metadata"
      >
        <Switch>
          <ProtectedRoute path="/editor/:id" component={Editor} />
          <Route component={DefaultPathContainer} />
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </Auth0Provider>
    </Router>

  );
}

export default App;
