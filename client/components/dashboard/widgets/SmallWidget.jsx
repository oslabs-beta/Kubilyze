import React, { useState, useEffect } from "react";

export const SmallWidget = ({ type, metric }) => {
  let daysRunning;
  if(type==='Created:'){    
    //Reformat dates in XX/XX/XX format
    let currDate = new Date(metric);
    let today = new Date();
    const yyyy = currDate.getFullYear();
    let yy = yyyy.toString().slice(2);
    let mm = currDate.getMonth() + 1; // Months start at 0!
    let dd = currDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;       
    let date = mm + '/' + dd +  '/' + yy;
    let diff = Math.floor((today - currDate) / (1000*60*60*24));
    daysRunning = " " + diff + " days ago";
    metric=date;      
  } ;
  //function to process date
  return (
    <>
      <div className="widget">
        
          <h2>{type}</h2>
          <h4>{metric}</h4>
          {daysRunning && <h4>{daysRunning}</h4>}       
       
      </div>
    </>
  );
};
