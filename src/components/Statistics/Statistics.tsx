import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  feildsToday,
  tablesGame,
} from "./statisticsinfo";
import Charts from './Charts';

 const Statistics = (): JSX.Element => (
     <div className="container mt-3">
      <div className="jumbotron mb-0">
        <h1 className="stat-header display-4">
          <i className="fas fa-user-chart"><img src="https://img.icons8.com/nolan/96/line-chart.png"/></i> Статистика:
        </h1>
        <h4 className="stat-header">
          <i className="fas fa-calendar-day"></i> Статистика за сегодня:
        </h4>
        <div className="today-stats-wrapper">
          {feildsToday.map((item, index): JSX.Element => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={item.text}
            >
              {item.text}
              <span className="badge badge-info badge-pill">{item.data}</span>
            </li>
          ))}
        </div>  <h4 className="stat-header">
          <i className="fas fa-gamepad"></i> Статистика мини-игр:
        </h4>
        <div className="tables-tab-wrapper"></div>
        <table className="table table-responsive-sm table-hover">
          <thead>
            <tr>
              {tablesGame.map((item, index): JSX.Element => (
                <th scope="col" key={item.game}>
                  {item.game}
                </th>
              ))}
            </tr> 
            </thead>
            <tbody >
            {feildsToday.map((item, index): JSX.Element => (
              <tr className="table-light table-bordered" key={item.text}>
                <p className='ml-3 mt-2 mb-0' >{item.text}</p>
                <td scope="col">0</td>
                <td scope="col">0</td>
                <td scope="col">0</td>
                <td scope="col">0</td>
              </tr>
            ))}  
            </tbody>     
        </table>
      </div>
      <h4 className="stat-header ml-5">
        <i className="fas fa-calendar-alt"></i> Общая статистика:
        </h4>
      <div className="all-stats-wrapper">
        <Charts /> 
      </div>
    </div>
)

export default Statistics;