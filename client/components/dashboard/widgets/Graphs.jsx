import React from 'react';
import {LineGraph} from './LineGraph.jsx';
import {results} from './SampleData.js';

//ToDo: update results processing to categorize data by days  and only have legend tick marks show for days not minutes

const data = {};
//iterate through objects in array
results.forEach((obj)=>{
    //check object's metric query label for data type
    let metric = '';
    if(obj.Label === 'container_cpu_utilization') metric = 'cpu';
    if(obj.Label === 'container_memory_utilization') metric = 'mem';

    //process array of timestamps, x axis data
    const timeArr = obj.Timestamps.toReversed();    
    const xData = timeArr.map((el) => {
      let currDate = new Date(el);
      let lastDate = new Date(timeArr[timeArr.length-1]);  
      
      //process data as dates
      const yyyy = currDate.getFullYear();
      let yy = yyyy.toString().slice(2);
      let mm = currDate.getMonth() + 1; // Months start at 0!
      let dd = currDate.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;       
      let dif = mm + '/' + dd +  '/' + yy;
      console.log(typeof yyyy)
      //process data as difference in minutes
      // let dif = ((lastDate.getTime()-currDate.getTime())/1000/60);
      
      //process data as difference in hours
      // let dif = ((lastDate.getDay()-currDate.getDay())*24+(lastDate.getTime()-currDate.getTime())/(3.6*10**6)); //formula needs to be modified to calculate hours difference across months
      return dif;
    });

    

    // let seen = new Set();
    
    // xData.forEach((value, index) => {
    //   if (seen.has(value)) {
    //     xData[index] = "test";
    //   } else {
    //     seen.add(value);
    //   }
    // });
    
  
    


    const valArr = obj.Values.toReversed();
    const yData = valArr.map((el) => el.toFixed(3))  
    
    data[metric]={
      xData: xData,
      yData: yData
    };      
})
// console.log(data.cpu.xData)
// console.log(data.cpu.yData)
export const Graphs = () => {
  return (
    <>      
 
              <div id="graph">
                {/* <div> */}
              <LineGraph xData={data.cpu.xData} yData={data.cpu.yData} type='CPU Utilization'/>
              {/* </div> */}
              </div>
              <div id="graph">
              {/* <div> */}
              <LineGraph xData={data.mem.xData} yData={data.mem.yData} type='Memory Utilization'/>
              {/* </div> */}
              </div>           
           
    </>
  );
};


