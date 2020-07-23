import React from 'react';
import AppBloc, { AppState } from './bloc';

const appBloc = new AppBloc(AppState.ENTER);
export const AppContext = React.createContext(appBloc);
