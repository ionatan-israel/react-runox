import { GameEngine } from '@runox-game/game-engine';
// import { collectionData } from 'rxfire/firestore';
import firebase from 'services/firebase-app';
import { Player } from '@runox-game/game-engine/lib/models/player.model';

export class GameEngineService {
  game = new GameEngine();

  constructor() {
    firebase.firestore().collection('rooms');
  }

  overrideInternalState(data: any) {
    this.game.overrideInternalState(data);
  }

  joinUser(user: Player) {
    this.game.join([user]).subscribe();
  }

}
