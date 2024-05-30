import React from 'react';
import {LineGraph} from './LineGraph.jsx';
import {results} from './SampleData.js';

//Preprocessing of fetched data to prepare for correct format for chartJS
//Iterate through each metric object in the results array
const data = {};
results.forEach((obj)=>{
    //Check object's metric query label for data type
    let metric = '';
    if(obj.Label === 'container_cpu_utilization') metric = 'cpu';
    if(obj.Label === 'container_memory_utilization') metric = 'mem';

    //Process array of timestamps, x axis data
    const timeArr = obj.Timestamps.toReversed();    
    const xData = timeArr.map((el) => {
      let currDate = new Date(el);
      let lastDate = new Date(timeArr[timeArr.length-1]);  
      
      //Reformat dates in XX/XX/XX format
      const yyyy = currDate.getFullYear();
      let yy = yyyy.toString().slice(2);
      let mm = currDate.getMonth() + 1; // Months start at 0!
      let dd = currDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;       
      let dif = mm + '/' + dd +  '/' + yy;  
      return dif;
    });
  
  //->ToDo: determine how to populate x data values with only occuring day
    // let seen = new Set();
        // xData.forEach((value, index) => {
    //   if (seen.has(value)) {
    //     xData[index] = "test";
    //   } else {
    //     seen.add(value);
    //   }
    // });  
    
    //Process array of Values, y axis data
    const valArr = obj.Values.toReversed();
    const yData = valArr.map((el) => el.toFixed(3))  
    
    //Data object to be passed to LineGraph
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


