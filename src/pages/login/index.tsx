import React, { useContext, useEffect, useState } from 'react';

import { AppContext, LoginContext } from 'app/context';
import logo from 'assets/images/logo.png';
import { Button, Card } from 'shared';
import './login.css';
import { LoginStatus } from './login-bloc';
import PlayerList from 'shared/player-list';

function NoPlayers() {
  return (
    <div className="text-gray-400 uppercase text-sm tracking-wider">
      Aún no se han añadido jugadores a la sala.
    </div>
  );
}

function Login() {
  // Hardcodeado!!!
  const players: any[] = [];
  const activePlayer: any = null;
  // BLoCs
  const appBloc = useContext(AppContext);
  const loginBloc = useContext(LoginContext);
  // LocalStates
  const [roomName, setRoomName] = useState<string>('');
  const [status, setStatus] = useState<LoginStatus>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    appBloc.user$.subscribe(setUser);
    loginBloc.roomName$.subscribe(setRoomName);
    loginBloc.status$.subscribe(setStatus);
    return () => {
      appBloc.dispose();
      loginBloc.dispose();
    }
  }, [appBloc, loginBloc]);

  return (
    <div className='login-page'>
      <Card>
        {/* Header */}
        <div slot="header" className="flex justify-center">
          <img src={logo} alt="RunoX logo" />
        </div>

        {/* Content */}
        <div slot="content" className="text-center">
          <div className="opacity-75 text-sm">SALA</div>

          {roomName ? <h1 className="text-2xl font-semibold uppercase">{roomName}</h1> : null}

          <input
            className='input-room'
            value={roomName}
            type='text'
            placeholder='Room name here ...'
            onChange={(e: any) => { loginBloc.addRoomName(e.target.value) }} />

          <div className="mt-6">
            {status === LoginStatus.ENTER && roomName !== ''
              ? <Button onClick={(e: any) => loginBloc.join()}>LOGIN & JOIN ROOM!</Button> : null}

            {status === LoginStatus.ENTER && roomName === ''
              ? <Button onClick={(e: any) => loginBloc.join()}>LOGIN & CREATE ROOM!</Button> : null}

            {status === LoginStatus.OWNER && roomName === ''
              ? <Button onClick={(e: any) => loginBloc.join()}>CREATE ROOM!</Button> : null}

            {status === LoginStatus.OWNER && roomName !== ''
              ? <Button onClick={(e: any) => loginBloc.join()}>START THE GAME!</Button> : null}

            {status === LoginStatus.WAITING && roomName !== ''
              ?
              <div className="px-4 text-4xl text-red-700 font-semibold">
                WAITING FOR THE OWNER TO START THE GAME
              </div>
              : null}
          </div>
        </div>

        {/* Footer */}
        <div slot='footer'>
          <div className="opacity-75 text-sm pb-2 mb-3 border-b border-gray-800">
            PLAYERS
          </div>

          {players.length > 0
            ? <PlayerList players={players} activePlayer={activePlayer} />
            : <NoPlayers />
          }

        </div>

      </Card>
    </div>
  );
}

export default Login;


  // const ref = firebase.firestore().collection('rooms').doc('jonatan');
  // let setAlan = ref.set({
  //   'first': 'Alan',
  //   'middle': 'Mathison',
  //   'last': 'Turing',
  //   'born': 1912
  // });
