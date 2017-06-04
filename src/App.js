import React from 'react';
import PropTypes from 'prop-types';
import Map, { GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import request from 'superagent';
import Marker from './imports/Marker.js';

const sicara = { lat: 48.8828993, lng: 2.320023 };

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      markers: [],
      center: sicara,
    };

    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  componentDidMount() {
    request.get('http://127.0.0.1:5000/')
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
      <Map
        google={this.props.google}
        initialCenter={sicara}
        center={this.state.center}
        zoom={4}
      >
        {this.state.markers.map(marker => {
          return (
            <Marker
              key={marker.title}
              google={this.props.google}
              title={marker.title}
              name={marker.name}
              position={marker.position}
              onClick={this.onMarkerClick}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          google={this.props.google}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.activeMarker.title}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

App.propTypes = {
  google: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: 'yourToken',
})(App);
