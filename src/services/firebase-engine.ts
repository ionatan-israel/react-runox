import { GameEngineService } from "./game-engine";
import firebase from './firebase-app'
import { first } from 'rxjs/operators';
import { from, Observable } from "rxjs";
import { Player } from "@runox-game/game-engine/lib/models/player.model";

class FirebaseEngineService {

  roomsCollection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor(private gameEngine: GameEngineService) {
    this.roomsCollection = firebase.firestore().collection('rooms-react');
  }

  checkRoom(roomName: string): Observable<any> {
    return from(this.roomsCollection.doc(roomName).get())
      .pipe(
        first()
      );
  }

  createRoom(roomName: string): Promise<any> {
    let _state = this.gameEngine.game.gameStateAsJSON;
    debugger;
    _state = JSON.parse(JSON.stringify(_state));
    const room = Object.assign(
      {},
      {
        ..._state,
        start: false,
        winner: null,
        name: roomName
      }
    );
    return this.roomsCollection.doc(roomName).set(room);
  }

  joinUser(user: Player, roomName: string): Promise<any> {
    this.gameEngine.joinUser(user);
    let _state = this.gameEngine.game.gameStateAsJSON;
    _state = JSON.parse(JSON.stringify(_state));
    const room = Object.assign(
      {},
      {
        ..._state,
        start: false,
        winner: null,
        name: roomName
      }
    );
    debugger;
    return this.roomsCollection.doc(roomName).update(room);
  }
}

export default FirebaseEngineService;
