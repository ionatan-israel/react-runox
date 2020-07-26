import { from, BehaviorSubject } from "rxjs";
import { Hand } from "@runox-game/game-engine/lib/models/hand.model";
import { Player } from "@runox-game/game-engine/lib/models/player.model";

import AppBloc, { AuthState } from "app/bloc";
import firebase from 'services/firebase-app';
import FirebaseEngineService from "services/firebase-engine";
import { GameEngineService } from "services/game-engine";

export enum LoginStatus {
  ENTER,
  OWNER,
  WAITING
}

export class LoginBloc {
  isRoomOwner: boolean = true;  // Hardcodeado?
  room: any = { name: '' }
  gameEngineService = new GameEngineService();
  firebaseEngineService: FirebaseEngineService;

  constructor(private appBloc: AppBloc) {
    this.firebaseEngineService = new FirebaseEngineService(this.gameEngineService);
  }

  private _avatars$ = new BehaviorSubject<Array<any>>([]);
  private _roomName$ = new BehaviorSubject<string>('');
  private _status$ = new BehaviorSubject<LoginStatus>(LoginStatus.ENTER);

  get roomName$() {
    return this._roomName$.asObservable();
  }

  get status$() {
    return this._status$.asObservable();
  }

  get avatars() {
    return this._avatars$.value;
  }

  get status() {
    return this._status$.value;
  }

  addRoomName(value: string) {
    this._roomName$.next(value);
  }

  join() {
    this.appBloc.addState(AuthState.AUTHENTICATING);
    from(
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    ).subscribe(
      result => {
        const _user = {
          cards: 0,
          id: result.user?.email,
          image: result.user?.photoURL,
          name: result.user?.displayName,
        }
        this.appBloc.addUser(_user);
        this.appBloc.addState(AuthState.AUTHENTICATED);
        this.onLogin();
      },
      err => {
        this.appBloc.addState(AuthState.UNAUTHENTICATED);
        console.log(err);
      }
    );
  }

  onLogin() {
    this._status$.next(this.isRoomOwner ? LoginStatus.OWNER : LoginStatus.WAITING);
    this._avatars$.next([this.appBloc.user].concat(this.avatars));
    const hand = new Hand();
    const player: Player = {
      id: this.appBloc.user.id,
      hand,
      pic: this.appBloc.user.image,
      name: this.appBloc.user.name
    }
    if (this.room.name !== '') {
      // Verificar si la sala existe
      this.checkRoom(this.room.name, player);
    } else {
      this.gameEngineService.joinUser(player);
      this.appBloc.addUser(player);
    }

  }

  setAvatars(avatars: Array<any>) {
    this._avatars$.next(avatars);
  }

  checkRoom(roomName: string, player: any) {
    this.firebaseEngineService.checkRoom(roomName).subscribe(
      (data: any) => {
        if (data.exists) {
          this.gameEngineService.overrideInternalState(data.data());
          const fullData = data.data();
          this.setAvatars(fullData.playersGroup.players);
          if (
            !fullData.playersGroup.players.find((data: any) => data.id === player.id)
          ) {
            this.firebaseEngineService.joinUser(player, this.room.name).then(
              (x: any) => {
                this.setAvatars([...fullData.playersGroup.players, player]);
              }
            );
          }
        } else {
          alert('La sala no existe');
        }
      }
    )
  }

  dispose() {
    this._avatars$.complete();
    this._status$.complete();
    this._roomName$.complete();
  }
}
