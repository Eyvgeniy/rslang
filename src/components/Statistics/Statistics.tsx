import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { optional } from "./statisticsinfo";
import Charts from "./Charts";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../models/RootState";
import { useAppDispatch } from "../../components/App";
import routes from "../../routes";
import {
  UserStatisticsModel,
  UserStatisticsOptionalModel,
  UserStatisticsGameModel,
  UserStatisticsRealModel,
} from "../../models/UserStatistic/UserStatistic";

function getDataWords(data: { learnWords: string[] }[]) {
  const words = data.map((game) => game?.learnWords?.length);
  return words.reduce((acum, word) => acum + word, 0);
}

function getDataPercentage(data: { percentage: number }[]) {
  const words = data.map((game) => game?.percentage);
  return Math.trunc(
    words.reduce((acum, word) => (acum + word) / words.length, 0)
  );
}

function getDataSeriesLength(data: { seriesLength: number }[]) {
  if (data.length < 1) {
    return 0;
  }
  const words = data.map((game) => game?.seriesLength);
  words.sort((a, b) => a - b);
  return words[0];
}

const Statistics = (): JSX.Element => {
  const nameGame = ["Саванна", "Спринт", "Аудиовызов", "Карточки"];
  const { currentUser, token } = useSelector((state: RootState) => state.user);
  const [dataStatistics, setDataStatistics] = useState(Object.values(optional));
  const [wordsAllDay, setWordsAllDay] = useState(0);
  const [percentageAllDay, setPercentageAllDay] = useState(0);
  
  useEffect(() => {
    axios
      .get(routes.getUserStatistics(currentUser.id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const realData = response.data;
          const data: UserStatisticsModel = {
            learnedWords: realData.learnedWords,
            optional:
              realData.optional && realData.optional?.value
                ? JSON.parse(realData.optional.value)
                : {},
          };
          setDataStatistics(Object.values(data.optional));
        }
      });
  }, [setDataStatistics]);

  useEffect(() => {
    if (dataStatistics) {
      setWordsAllDay(getDataWordsAllDay(dataStatistics));
      setPercentageAllDay(getPercentageAllDay(dataStatistics));
     }
  }, [dataStatistics]);

  function getDataWordsAllDay(dataStatistics: any[]) {
    const arr: string[] = [];
    dataStatistics.map((game) =>
      game.forEach((word: any) =>
        word.learnWords.forEach((word: any) => arr.push(word))
      )
    );
    const arrayWords = Array.from(new Set(arr));
    return arrayWords.length;
  }

  function getPercentageAllDay(dataStatistics: any[]) {
    const arr: number[] = [];
    dataStatistics.map((game) =>
      game.forEach((word: { percentage: number }) => arr.push(word.percentage))
    );
    return Math.trunc(
      arr.reduce((acum, word) => (acum + word) / arr.length, 0)
    );
  }

  function getDateAllDay(dataStatistics: any[]) {
    const arr: string[] = [];
    dataStatistics.map((game) =>
      game.forEach((word: { dateTime: string }) => arr.push(word.dateTime))
    );
    const arrayWords = Array.from(new Set(arr));
    return arrayWords;
  }

  return (
    <div className="container mt-3">
      <div className="jumbotron mb-0">
        <h1 className="display-4">
          <img src="https://img.icons8.com/nolan/96/line-chart.png" />{" "}
          Статистика:
        </h1>
        <h4>Статистика за сегодня:</h4>
        <div>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {"Количество изученных слов за весь день:"}
            <span className="badge badge-info badge-pill">{wordsAllDay}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {"Процент правильных ответов за весь день:"}
            <span className="badge badge-info badge-pill">
              {percentageAllDay}%
            </span>
          </li>
        </div>{" "}
        <h4>Статистика мини-игр:</h4>
        <div className="tables-tab-wrapper"></div>
        <table className="table table-responsive-sm table-hover">
          <thead>
            <tr>
              <th></th>
              {nameGame.map(
                (item, index): JSX.Element => (
                  <th scope="col" key={item}>
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="table-light table-bordered">
              <p className="ml-3 mt-2 mb-0">{"Количество изученных слов:"}</p>
              {dataStatistics.map(
                (item, index): JSX.Element => (
                  <td scope="col" key={index}>
                    {getDataWords(item)}
                  </td>
                )
              )}
            </tr>
            <tr className="table-light table-bordered">
              <p className="ml-3 mt-2 mb-0">{"Процент правильных ответов:"}</p>
              {dataStatistics.map(
                (item, index): JSX.Element => (
                  <td scope="col" key={index}>
                    {getDataPercentage(item)}%
                  </td>
                )
              )}
            </tr>
            <tr className="table-light table-bordered">
              <p className="ml-3 mt-2 mb-0">{"Лучшая серия ответов:"}</p>
              {dataStatistics.map(
                (item, index): JSX.Element => (
                  <td scope="col" key={index}>
                    {getDataSeriesLength(item)}
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="ml-5">
        <i className="f"></i> Общая статистика:
      </h4>
      <div>
        <Charts dataStatistics={dataStatistics} wordsAllDay={wordsAllDay} arrayWords = {getDateAllDay(dataStatistics)}/>
      </div>
    </div>
  );
};

export default Statistics;
