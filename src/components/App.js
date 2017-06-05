import React from 'react';
import Map from './Map';

import styles from './App.css';

export class App extends React.Component {
  render() {
    console.log(styles);
    return (
      <div className='wrapper'>
         <div className='menu'>
          <h2>DataViz: KISS</h2>
          <h3>(Keep It Simple Stupid)</h3>
          <hr/>
          <ul style={{flex: 1}}>
            <li>Upload CSV</li>
            <li>Get Geolocalized data!</li>
          </ul>
         </div>
         <Map />
       </div>
    );
  }
}

export default App;
