import React from 'react';

import './player-list.css';
import Avatar from 'shared/avatar';

const PlayerList = ({ activePlayer, players }: { activePlayer: any, players: Array<any>}) => (
  <div className="flex justify-around flex-wrap">
    {players.map((player: any) =>
      <Avatar
        name={player.name}
        image={player.pic}
        badge={player.hand.cards.length}
        active={player.id === activePlayer?.id}
      />)}
  </div>
)

export default PlayerList;
