import React from "react";
import { useHistory } from "react-router-dom";
import "./GamesNav.css";

const games = [
  {
    name: "Саванна",
    img: "../../../public/assets/background.svg",
    rout: "/savanna",
  },
  {
    name: "Спринт",
    img: "../../../public/assets/bgsprint.jpg",
    rout: "/sprint",
  },
  {
    name: "Аудиовызов",
    img: "../../../public/assets/background.svg",
    rout: "/audioChallenge",
  },
  { name: "Карточки", 
    img: "../../../public/assets/bg.jpg", 
    rout: "/cardGame" },
];

const GamesNav = () => {
  const history = useHistory();
  return (
    <section className="games-nav">
      {games.map((game, i) => (
        <div
          className="game-card"
          key={i}
          onClick={() => history.push(game.rout)}
        >
          <div
            className="game-block"
            style={{ backgroundImage: `url(${game.img})`}}
          >
            {game.name}
          </div>
        </div>
      ))}
    </section>
  );
};

export default GamesNav;