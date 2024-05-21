import React from 'react';
import {LineGraph} from './LineGraph.jsx';
import {results} from './SampleData.js';


const data = {};
//iterate through objects in array
results.forEach((obj)=>{
    //check object's label key for data type
    let metric = '';
    if(obj.Label === 'container_cpu_utilization') metric = 'cpu';
    if(obj.Label === 'container_memory_utilization') metric = 'mem';

    //process array of timestamps, x axis data
    const timeArr = obj.Timestamps.toReversed();    
    const xData = timeArr.map((el) => {
      let currDate = new Date(el);
      let lastDate = new Date(timeArr[timeArr.length-1]);  
      let dif = ((lastDate.getTime()-currDate.getTime())/1000/60);
      return dif;
    });
    
    //process array of Values,  x axis data
    const valArr = obj.Values.toReversed();
    const yData = valArr.map((el) => el.toFixed(3))  
    
    data[metric]={
      xData: xData,
      yData: yData
    };      
})

export const Graphs = () => {
  return (
    <>      
 
              <div id="graph">
              <LineGraph xData={data.cpu.xData} yData={data.cpu.yData} type='CPU Utilization'/>
              </div>
              <div id="graph">
              <LineGraph xData={data.mem.xData} yData={data.mem.yData} type='Memory Utilization'/>
              </div>           
           
    </>
  );
};


