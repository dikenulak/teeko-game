import React from 'react'
import { nameOfPlayer, PLAYER_1, PLAYER_2 } from './constants'

const Header = ({winnerDeclared, player, info, onRestart}) => {
  return (
    <header>
    {!winnerDeclared && (
      <div>
        Current Turn:{' '}
        <b className={`${player ? ' black' : 'red'}`}>
          {player ? nameOfPlayer[PLAYER_1] : nameOfPlayer[PLAYER_2]}
        </b>
      </div>
    )}
    {winnerDeclared && <button onClick={() => onRestart()}>Restart</button>}
    <div className="info">{info ? `${info}!!!!!` : ''}</div>
  </header>
  )
}

export default Header;
