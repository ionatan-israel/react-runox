import React from 'react';
import AppBloc from './bloc';
import { LoginBloc } from 'pages/login/login-bloc';

const appBloc = new AppBloc();
export const AppContext = React.createContext(appBloc);

const loginBloc = new LoginBloc(appBloc);
export const LoginContext = React.createContext(loginBloc)
