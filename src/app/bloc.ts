import { Bloc } from '@bloc-js/bloc';

export enum AppState {
  ENTER,
  OWNER,
  WAITING
}

class AppBloc extends Bloc<AppState> {

  public setState(newState: AppState) {
    this.next(newState);
  }

}

export default AppBloc;
