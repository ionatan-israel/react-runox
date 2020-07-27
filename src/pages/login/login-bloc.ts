import { from, BehaviorSubject } from "rxjs";
import { Hand } from "@runox-game/game-engine/lib/models/hand.model";
import { Player, IPlayer } from "@runox-game/game-engine/lib/models/player.model";

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
  isRoomOwner: boolean = true;  // Hardcodeado !!!
  gameEngineService = new GameEngineService();
  firebaseEngineService: FirebaseEngineService;

  constructor(private appBloc: AppBloc) {
    this.firebaseEngineService = new FirebaseEngineService(this.gameEngineService);
  }

  private _avatars$ = new BehaviorSubject<Array<any>>([]);
  private _players$ = new BehaviorSubject<IPlayer[]>([]);
  private _roomName$ = new BehaviorSubject<string>('');
  private _roomNameFixed$ = new BehaviorSubject<boolean>(false);
  private _status$ = new BehaviorSubject<LoginStatus>(LoginStatus.ENTER);

  // Streams
  get players$() { return this._players$.asObservable(); }
  get roomName$() { return this._roomName$.asObservable(); }
  get roomNameFixed$() { return this._roomNameFixed$.asObservable(); }
  get status$() { return this._status$.asObservable(); }

  // Values
  get avatars() { return this._avatars$.value; }
  get status() { return this._status$.value; }

  // Events
  addRoomNameFixed(value: boolean) { this._roomNameFixed$.next(value); }
  addRoomName(value: string) { this._roomName$.next(value); }

  create() {
    this.firebaseEngineService.createRoom(this._roomName$.value)
      .then(() => console.log('operacion ok!'))
  }

  join() {
    this.appBloc.addState(AuthState.AUTHENTICATING);
    from(
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    ).subscribe(
      result => {
        const user = result.user;
        if (user?.email && user.displayName && user.photoURL) {
          const _user: IPlayer = new Player(
            user.email,
            user.displayName,
            user.photoURL
          );
          this.appBloc.addUser(_user);
          this.appBloc.addState(AuthState.AUTHENTICATED);
          this.onLogin();
        }
      },
      err => {
        this.appBloc.addState(AuthState.UNAUTHENTICATED);
        console.log(err);
      }
    );
  }

  onLogin() {
    this._status$.next(this.isRoomOwner ? LoginStatus.OWNER : LoginStatus.WAITING);
    if (this.appBloc.user) {
      this._players$.next([this.appBloc.user]);
      const hand = new Hand();
      const player: IPlayer = {
        id: this.appBloc.user.id,
        hand: hand,
        pic: this.appBloc.user.pic,
        name: this.appBloc.user.name,
      };
      this.gameEngineService.playerId = player.id;

      if (this._roomNameFixed$.value) {
        // Verificar si la sala existe
        this.checkRoom(this._roomName$.value, player); // mal!
      } else {
        this.gameEngineService.joinUser(player);
      }
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
            this.firebaseEngineService.joinUser(player, this._roomName$.value).then(
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
    this._players$.complete();
    this._avatars$.complete();
    this._status$.complete();
    this._roomName$.complete();
    this._roomNameFixed$.complete();
  }
}
