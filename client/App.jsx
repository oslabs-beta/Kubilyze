import React from 'react';
import {LineGraph} from './components/LineGraph.jsx';
import {results} from './components/SampleData.js';
import {Graphs} from './components/Graphs.jsx';
import {ClusterCircle} from './components/ClusterCircle.jsx';

const App = () => {
  return (
    <>      
        <div id="nav-bar" className="container">Let's Go Kubilyze!</div>
        <div id="page">
          {/* <div id="side-bar" className="container"></div> */}
          <div id="main-area" className="container">
            {/* <div id="graph-area">
              <Graphs/>           
            </div> */}
            <div id="cluster-area">
              <ClusterCircle/>           
            </div>
          </div>
        </div>
    </>
  );
};

export default App;
