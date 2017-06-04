import React, { PropTypes } from 'react';
import Map, { GoogleApiWrapper} from 'google-maps-react';
import Marker from './imports/Marker.js';

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      places: [],
      pagination: null
    };
  }
  render() {
    return (
        <Map
          google={this.props.google}
          center={{lat: 48.8828993, lng: 2.320023}}
        >
          <Marker
            title={'Sicara'}
            name={'Sicara'}
            position={{lat: 48.8828993, lng: 2.320023}} />
        </Map>
    );
  }
}

App.propTypes = {
  google: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: 'theAPIkey',
})(App);
