import React, { useContext } from 'react';

import { useBlocState } from '@bloc-js/react-bloc';
import { AppState } from 'app/bloc';
import { AppContext } from 'app/context';
import { Button } from 'shared';
import LoginModal from './components/login-modal';
import './login.css';



function Login() {
  const bloc = useContext(AppContext);
  const state = useBlocState(bloc);

  return (
    <div className='login-page'>

      <Button onClick={() => bloc.setState(AppState.WAITING)}>
        wait - {state}
      </Button>

      <hr />
      <LoginModal />

    </div>
  );
}

export default Login;
