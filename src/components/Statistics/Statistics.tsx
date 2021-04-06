import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { optional } from "./statisticsinfo";
import Charts from "./Charts";

const dataGames = Object.entries(optional);

const Statistics = (): JSX.Element => (
  <div className="container mt-3">
    <div className="jumbotron mb-0">
      <h1 className="display-4">
          <img src="https://img.icons8.com/nolan/96/line-chart.png" />
      {" "}
        Статистика:
      </h1>
      <h4 >
      Статистика за сегодня:
      </h4>
      <div>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {"Количество изученных слов за весь день:"}
          <span className="badge badge-info badge-pill">{"0"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {"Процент правильных ответов за весь день:"}
          <span className="badge badge-info badge-pill">{"0"}</span>
        </li>
      </div>{" "}
      <h4>
       Статистика мини-игр:
      </h4>
      <div className="tables-tab-wrapper"></div>
      <table className="table table-responsive-sm table-hover">
        <thead>    
          <tr>
            <th></th>
            {dataGames.map(
              (item, index): JSX.Element => (
                <th scope="col" key={item[1].type}>
                  {item[1].type}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="table-light table-bordered">
            <p className="ml-3 mt-2 mb-0">{"Количество изученных слов:"}</p>
            {dataGames.map(
              (item, index): JSX.Element => (
                <td scope="col" key={index}>
                  {item[1].lernWords}
                </td>
              )
            )}
          </tr>
          <tr className="table-light table-bordered">
            <p className="ml-3 mt-2 mb-0">{"Процент правильных ответов:"}</p>
            {dataGames.map(
              (item, index): JSX.Element => (
                <td scope="col" key={index}>
                  {item[1].percentage}
                </td>
              )
            )}
          </tr>
          <tr className="table-light table-bordered">
            <p className="ml-3 mt-2 mb-0">{"Лучшая серия ответов:"}</p>
            {dataGames.map(
              (item, index): JSX.Element => (
                <td scope="col" key={index}>
                  {item[1].seriesLength}
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
      <Charts />
    </div>
  </div>
);

export default Statistics;
