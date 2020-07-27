import React from 'react';

import './player-list.css';
import Avatar from 'shared/avatar';

function NoPlayers() {
  return (
    <div className="text-gray-400 uppercase text-sm tracking-wider">
      Aún no se han añadido jugadores a la sala.
    </div>
  );
}

const PlayerList = ({ activePlayer, players }: { activePlayer: any, players: any[] }) => (
  players.length > 0
    ? <div className="flex justify-around flex-wrap">
      {players.map((player) =>
        <Avatar
          key={player.id}
          name={player.name}
          image={player.pic}
          // badge={player.hand.cards.length}
          active={activePlayer}
        />)}
    </div>
    : <NoPlayers />
);

export default PlayerList;
