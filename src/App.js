import React, { PropTypes } from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';

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
        />
    );
  }
}

App.propTypes = {
  google: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: 'theAPIkey',
})(App);
