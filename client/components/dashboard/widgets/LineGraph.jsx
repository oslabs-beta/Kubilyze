import React from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
export const LineGraph = ({xData, yData, type}) => {

  //Chart JS data object to be passed as props
  const data = {
    labels: xData,
    datasets: [
      {
        label: type,
        data: yData,              
        backgroundColor:'hsl(258, 99%, 95%)',
        fill: true, 

      }
    ]
  };  

  //Chart JS propsobject to be passed as props
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title:{
        display: true,
        text: type
      },     
    },
    elements:{
      line: {
        borderJoinStyle:'round',
        borderColor:'hsl(258, 99%, 47%)',       
      },
      point: {
        pointStyle: false,
      }
    },
    scales:{
      x: {
        display: true,
        title: {
          display: true,
          text: 'Past 7 Days'
        },
        drawTicks: true,
        ticks:{
          autoSkip: false,
          // maxTicksLimit:7
        },
        grid: {
          drawTicks: false,
        }
      },
      y: {
        // min:0.0745,
        // max:0.0775,     
        display: true,
        title: {
          display: true,
          text: 'Utilization (%)'
        },
      }
    }
  }

  return (
    <>
      <Line options={options} data={data} height={null} width={null} />  
    </>
  );
};


