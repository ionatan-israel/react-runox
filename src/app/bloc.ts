import { BehaviorSubject, Observable } from 'rxjs';
import { IPlayer } from '@runox-game/game-engine/lib/models/player.model';

export enum AuthState {
  AUTHENTICATED,
  AUTHENTICATING,
  UNAUTHENTICATED,
  UNINITIALIZED,
}

class AppBloc {

  // [Controllers] - Observable/Stream to handle the data input
  private _owner$ = new BehaviorSubject<boolean>(true);
  private _state$ = new BehaviorSubject<AuthState>(AuthState.UNINITIALIZED);
  private _user$ = new BehaviorSubject<IPlayer | null>(null);

  // [Subscriptions] - Retrieve data from Observable/Stream
  get owner$(): Observable<boolean> {
    return this._owner$.asObservable();
  }

  get state$(): Observable<AuthState> {
    return this._state$.asObservable();
  }

  get user$(): Observable<any> {
    return this._user$.asObservable();
  }

  // [Events] - Function to handle the action on inputs
  addState(value: AuthState): void {
    this._state$.next(value);
  }

  addUser(value: any): void {
    this._user$.next(value);
  }

  addOwner(value: boolean): void {
    this._owner$.next(value);
  }

  // [Values]
  get owner() {
    return this._owner$.value;
  }

  get state() {
    return this._state$.value;
  }

  get user() {
    return this._user$.value;
  }

  dispose(): void {
    this._state$.complete();
    this._user$.complete();
    this._owner$.complete();
  }

  // https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest
  // get prueba() {
  //   return combineLatest(
  //     this._state$,
  //     this._user$,
  //     (s, u) => {
  //       return 'Hola'
  //     }
  //   );
  // }
}

export default AppBloc;
