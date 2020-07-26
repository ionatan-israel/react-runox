import React, { useContext } from 'react';

import { AppContext, LoginContext } from './context';
import { Routes } from './router';

function App() {

  const appBloc = useContext(AppContext);
  const loginBloc = useContext(LoginContext);

  return (
    <AppContext.Provider value={appBloc}>
      <LoginContext.Provider value={loginBloc}>
        <Routes />
      </LoginContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
