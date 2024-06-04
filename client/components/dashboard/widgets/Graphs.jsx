import React, {useEffect} from 'react';
import {LineGraph} from './LineGraph.jsx';
// import {results} from './SampleData.js';

export const Graphs = ({results}) => {

  const data = {
    cpu:{xData:[], yData:[]},
    mem:{xData:[], yData:[]}
  };

    if(results){
      //Preprocessing of fetched data to prepare for correct format for chartJS
    //Iterate through each metric object in the results array
console.log(results)
    results.forEach((obj)=>{
      //Check object's metric query label for data type
      let metric = '';
      if(obj.Label.includes('cpu')) metric = 'cpu';
      if(obj.Label.includes('memory')) metric = 'mem';

      //Process array of timestamps, x axis data
      const timeArr = obj.Timestamps;    
      let xData = timeArr.map((el) => {
        let currDate = new Date(el);
        
        //Reformat dates in XX/XX/XX format
        const yyyy = currDate.getFullYear();
        let yy = yyyy.toString().slice(2);
        let mm = currDate.getMonth() + 1; // Months start at 0!
        let dd = currDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;       
        let formattedDate = mm + '/' + dd +  '/' + yy;  
        return formattedDate;
      });
    
      //Show date only once along x axes
      let seen = new Set();
          xData.forEach((value, index) => {
        if (seen.has(value)) {
          xData[index] = "";
        } else {
          seen.add(value);
        }
      }); 
      xData=xData.toReversed();//flip order to plot older dates first

      //Process array of Values, y axis data
      const valArr = obj.Values.toReversed();//flip order to plot older dates first
      const yData = valArr.map((el) => el.toFixed(3))  
      
      //Data object to be passed to LineGraph
      data[metric]={
        xData: xData,
        yData: yData
      };      
    })
  }
 
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


