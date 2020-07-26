import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Game, Login } from 'pages';

const RouterContext = React.createContext({})

const PublicRoute = ({ component: Component, ...res }: any) => (
  <Route {...res} render={props => (
    <Component {...props} />
  )}
  />
);

export const Router = ({ children }: { children: any }) => {
  return (
    <BrowserRouter>
      <Route>
        {(routeProps: any) => (
          <RouterContext.Provider value={routeProps}>
            {children}
          </RouterContext.Provider>
        )}
      </Route>
    </BrowserRouter>
  );
}

export const Routes = () => {
  return (
    <Switch>
      <PublicRoute component={Login} exact path='/' />
      <PublicRoute component={Game} exact path='/game' />
    </Switch>
  )
}
