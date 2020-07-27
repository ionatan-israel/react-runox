import React, { useContext, useEffect, useState } from 'react';

import { AppContext, LoginContext } from 'app/context';
import logo from 'assets/images/logo.png';
import { Button, Card } from 'shared';
import './login.css';
import { LoginStatus } from './login-bloc';
import PlayerList from 'shared/player-list';
import { AuthState } from 'app/bloc';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';

function Login() {
  // Hardcodeado!!!
  const activePlayer: boolean = true;
  // BLoCs
  const appBloc = useContext(AppContext);
  const loginBloc = useContext(LoginContext);
  // LocalStates
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [roomName, setRoomName] = useState<string>('');
  const [roomNameFixed, setRoomNameFixed] = useState<boolean>();
  const [state, setState] = useState<AuthState>();
  const [status, setStatus] = useState<LoginStatus>();

  useEffect(() => {
    appBloc.state$.subscribe(setState);
    loginBloc.players$.subscribe(setPlayers);
    loginBloc.status$.subscribe(setStatus);
    loginBloc.roomName$.subscribe(setRoomName);
    loginBloc.roomNameFixed$.subscribe(setRoomNameFixed);
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

          {roomName
            ? <h1 className="text-2xl font-semibold uppercase" onDoubleClick={() => loginBloc.addRoomNameFixed(false)}>{roomName}</h1>
            : null}

          {state === AuthState.AUTHENTICATED && !roomNameFixed
            ? <input
              className='input-room'
              value={roomName}
              type='text'
              placeholder='Room name here ...'
              onChange={(e: any) => { loginBloc.addRoomName(e.target.value) }}
              onKeyPress={(event: any) => { if (event.key === 'Enter') loginBloc.addRoomNameFixed(true) }} />
            : null}

          <div className="mt-6">
            {state !== AuthState.AUTHENTICATED
              ? <Button onClick={(e: any) => loginBloc.join()}>LOGIN & CREATE ROOM!</Button> : null}

            {state !== AuthState.AUTHENTICATED && roomName !== ''
              ? <Button onClick={(e: any) => loginBloc.join()}>LOGIN & JOIN ROOM!</Button> : null}

            {state === AuthState.AUTHENTICATED && !roomNameFixed
              ? <Button onClick={(e: any) => loginBloc.create()}>CREATE ROOM!</Button> : null}

            {status === LoginStatus.OWNER && roomNameFixed
              ? <Button onClick={(e: any) => loginBloc.join()}>START THE GAME!</Button> : null}

            {status === LoginStatus.WAITING && roomNameFixed
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

          <PlayerList players={players} activePlayer={activePlayer} />

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
