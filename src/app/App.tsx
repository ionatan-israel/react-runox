import React, { useContext } from 'react';

import { Login } from 'pages';
import { AppContext } from './context';

function App() {

  const appBloc = useContext(AppContext);

  return (
    <AppContext.Provider value={appBloc}>
      <Login />
    </AppContext.Provider>
  );
}

export default App;
