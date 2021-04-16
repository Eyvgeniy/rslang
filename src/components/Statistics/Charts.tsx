import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import { optional } from "./statisticsinfo";

interface StatisticsProps {
  dataStatistics: any,
  wordsAllDay: number,
  arrayWords: string[]
}


const genData = (wordsAllDay: number, arrayWords: string[]) => ({
  labels: arrayWords,
  datasets: [
    {
      type: "line",
      label: "Количество изученных слов за день",
      backgroundColor: "#b8daff",
      borderColor: "rgba(39, 74, 172, 1)",
      borderWidth: 2,
      fill: true,
      data: [wordsAllDay],
    },
  ],
});

const genDataAll = (wordsAllDay: number, arrayWords: string[]) => ({
  labels: arrayWords,
  datasets: [
    {
      type: "line",
      label: "Количество изученных слов за весь период",
      backgroundColor: "#b8daff",
      borderColor: "rgba(39, 74, 172, 1)",
      borderWidth: 2,
      fill: true,
      data: [wordsAllDay],
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

const Charts = (props: StatisticsProps) => {
const {dataStatistics, wordsAllDay, arrayWords} = props

const data = genData(wordsAllDay, arrayWords);
const dataAll = genDataAll(wordsAllDay, arrayWords);

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
