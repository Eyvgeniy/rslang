import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import { month } from "./statisticsinfo";

const day = [
  "31.03.2021",
  "01.04.2021",
  "02.04.2021",
  "03.04.2021",
  "04.04.2021",
  "04.04.2021",
];

const words = [125, 48, 59, 84, 85, 121, 124, 98];

const genData = () => ({
  labels: day,
  datasets: [
    {
      type: "line",
      label: "Количество изученных слов за день",
      backgroundColor: "#b8daff",
      borderColor: "rgba(39, 74, 172, 1)",
      borderWidth: 2,
      fill: true,
      data: words,
    },
  ],
});

const genDataAll = () => ({
  labels: day,
  datasets: [
    {
      type: "line",
      label: "Количество изученных слов за весь период",
      backgroundColor: "#b8daff",
      borderColor: "rgba(39, 74, 172, 1)",
      borderWidth: 2,
      fill: true,
      data: words,
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
          beginAtZero: false,
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
