import React from 'react';
import request from 'superagent';

import Map from './Map';
import UploadForm from './UploadForm';
import environment from '../helpers/environment'

import './App.css';

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      markers: [],
      center: null,
    };

    this.onUpload = this.onUpload.bind(this);
  }

  onUpload(file) {
    request.get(`${environment.backend}/markers/${file.name}`)
    .then(response => {
      if (response.body.length) {
        this.setState({
          markers: response.body,
          center: response.body[0].position,
        });
      } else {
        this.setState({
          markers: [],
        });
      }
    });
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='menu'>
          <h2>DataViz: KISS</h2>
          <h3>(Keep It Simple Stupid)</h3>
          <hr/>
          <div className="upload">
            <UploadForm onUpload={this.onUpload}/>
            And enjoy the new markers!
          </div>
        </div>
        <Map markers={this.state.markers} center={this.state.center}/>
       </div>
    );
  }
}

export default App;
