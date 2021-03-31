import React from 'react';
import { useHistory } from 'react-router-dom';
import './GamesNav.css';

const games = [
  { name: 'Саванна', img: '../../public/assets/background.svg' },
  { name: 'Спринт', img: '../../public/assets/background.svg' },
  { name: 'Аудиовызов', img: '../../public/assets/background.svg' },
  { name: 'Своя игра', img: '../../public/assets/background.svg' },
];

const GamesNav = () => {
  const history = useHistory();
  return (
    <section className="games-nav">
      {games.map((game, i) => (
        <div className="game-card" key={i} onClick={() => history.push('/savanna')}>
          <div className="game-savanna">{game.name}</div>
        </div>
      ))}
    </section>
  );
};

export default GamesNav;
