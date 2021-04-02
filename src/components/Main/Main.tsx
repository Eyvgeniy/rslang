import React from 'react';

const Main = () => (
  <div className="container">
    <div className="photo-container">
      <img className="photo" src="https://i.ibb.co/68dXPbP/photo-new.jpg"></img>
    </div>
    <div className="description-container">
      <h1>RS Lang</h1>
      <p>эффективное приложение для изучение английского языка</p>
      <div className="advantages-container">
        <div className="advantages-card">
          <img src="https://img.icons8.com/nolan/96/line-chart.png" />
          <p>Просматривай статистику изученных слов</p>
        </div>
        <div className="advantages-card">
          <img src="https://img.icons8.com/nolan/96/last-24-hours.png" />
          <p>Занимайся в любое свободное время</p>
        </div>
        <div className="advantages-card">
          <img src="https://img.icons8.com/nolan/96/controller.png" />
          <p>Играй и запоминай слова</p>
        </div>
        <div className="advantages-card">
          <img src="https://img.icons8.com/nolan/96/settings--v1.png" />
          <p>Управляй настройками карточек</p>
        </div>
        <div className="advantages-card">
          <img src="https://img.icons8.com/nolan/96/musical-notes.png" />
          <p>Слушай правильное произношение слов</p>
        </div>
        <div className="advantages-card">
          <img src="https://img.icons8.com/nolan/96/star.png" />
          <p>Отмечай сложные слова для повторения</p>
        </div>
        <div className="advantages-card">
          <img src="https://img.icons8.com/nolan/96/waste.png" />
          <p>Удаляй изученные слова</p>
        </div>
      </div>
      <div className="video-container">
        <h2>Посмотри видео и ознакомься с работой приложения</h2>
        <img src="https://pngimg.com/uploads/macbook/macbook_PNG47.png" />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/pYBYBBdqHuo"
          title="RS Lang"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="team-container">
        <h2>Наша команда</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="https://автономная-канализация.kiev.ua/ru/img/avatar.jpg" />
            <div className="team-card__description">
              <h3>
                Евгений<span>, Team Leader</span>
              </h3>
              <p className="team-card_location">
                <a href="http://maps.google.com/?q=Калининград" target="_blank">
                  <img src="https://img.icons8.com/nolan/64/marker.png" width="25" />
                </a>
                Калининград, Россия
              </p>
              <p className="team-card_development">
                <span>Вклад в разработку:</span>
                <br></br>Разработка мини-игры "Саванна", разработка электронного учебника со
                словарем
              </p>
              <p className="team-card_github">
                <a href="https://github.com/Eyvgeniy" target="_blank">
                  <img src="https://img.icons8.com/nolan/64/github.png" width="35" />
                </a>
                Eyvgeniy
              </p>
            </div>
          </div>
          <div className="team-card">
            <img src="https://автономная-канализация.kiev.ua/ru/img/avatar.jpg" />
            <div className="team-card__description">
              <h3>
                Дмитрий<span>, Developer</span>
              </h3>
              <p className="team-card_location">
                <a href="http://maps.google.com/?q=Минск" target="_blank">
                  <img src="https://img.icons8.com/nolan/64/marker.png" width="25" />
                </a>
                Минск, Беларусь
              </p>
              <p className="team-card_development">
                <span>Вклад в разработку:</span>
                <br></br>Разработка мини-игры "Аудиовызов", бекенд{' '}
              </p>
              <p className="team-card_github">
                <a href="https://github.com/MrBlacky01" target="_blank">
                  <img src="https://img.icons8.com/nolan/64/github.png" width="35" />
                </a>
                MrBlacky01
              </p>
            </div>
          </div>
          <div className="team-card">
            <img src="https://автономная-канализация.kiev.ua/ru/img/avatar.jpg" />
            <div className="team-card__description">
              <h3>
                Михайлов Максим<span>, Developer</span>
              </h3>
              <p className="team-card_location">
                <a href="http://maps.google.com/?q=Минск" target="_blank">
                  <img src="https://img.icons8.com/nolan/64/marker.png" width="25" />
                </a>
                Минск, Беларусь
              </p>
              <p className="team-card_development">
                <span>Вклад в разработку:</span>
                <br></br>Разработка мини-игры "Спринт", главной страницы, видео презентации
                приложения
              </p>
              <p className="team-card_github">
                <a href="https://github.com/MAXONVTEC" target="_blank">
                  <img src="https://img.icons8.com/nolan/64/github.png" width="35" />
                </a>
                MAXONVTEC
              </p>
            </div>
          </div>
          <div className="team-card">
            <img src="https://автономная-канализация.kiev.ua/ru/img/avatar.jpg" />
            <div className="team-card__description">
              <h3>
                Журавлева Наталья<span>, Developer</span>
              </h3>
              <p className="team-card_location">
                <a href="http://maps.google.com/?q=Минск" target="_blank">
                  <img src="https://img.icons8.com/nolan/64/marker.png" width="25" />
                </a>
                Минск, Беларусь
              </p>
              <p className="team-card_development">
                <span>Вклад в разработку:</span>
                <br></br>Разработка своей игры "Карточки", страницы "Статистика"
              </p>
              <p className="team-card_github">
                <a href="https://github.com/Natallia22" target="_blank">
                  <img src="https://img.icons8.com/nolan/64/github.png" width="35" />
                </a>
                Natallia22
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Main;
