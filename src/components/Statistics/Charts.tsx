import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import { optional } from "./statisticsinfo";

const dataGames = Object.entries(optional);
console.log(dataGames[0][1].lernWords);

const genData = () => ({
  labels: dataGames[0][1].dateTime,
  datasets: [
    {
      type: "line",
      label: "Количество изученных слов за день",
      backgroundColor: "#b8daff",
      borderColor: "rgba(39, 74, 172, 1)",
      borderWidth: 2,
      fill: true,
      data: dataGames[0][1].lernWords,
    },
  ],
});

const genDataAll = () => ({
  labels: dataGames[0][1].dateTime,
  datasets: [
    {
      type: "line",
      label: "Количество изученных слов за весь период",
      backgroundColor: "#b8daff",
      borderColor: "rgba(39, 74, 172, 1)",
      borderWidth: 2,
      fill: true,
      data: dataGames[0][1].lernWords,
    },
  ],
});

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          stepSize: 50,
          max: 250,
          stacked: true,
          beginAtZero: true,
        },
      },
    ],
  },
};

const data = genData();
const dataAll = genDataAll();

const Charts = () => {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-around'}} >
         <div>
        <Line data={data} options={options} height={250} width={550}/>
      </div>
      <div>
        <Line data={dataAll} options={options} height={250} width={550}/>
      </div>
      </div>
     
    </div>
  );
};

export default Charts;
