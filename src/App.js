import React from 'react';
import PropTypes from 'prop-types';
import Map, { GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import Marker from './imports/Marker.js';

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
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

  render() {
    const markers = [{
      name: 'Sicara',
      title: 'Sicara',
      position: {lat: 48.8828993, lng: 2.320023},
    }];

    return (
      <Map
        google={this.props.google}
        center={markers[0].position}
      >
        {markers.map(marker => {
          return (
            <Marker
              key={marker.title}
              title={marker.title}
              name={marker.name}
              position={marker.position}
              onClick={this.onMarkerClick}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
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
