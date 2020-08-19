import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {API_URL} from '@env';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';
import {updateLocation} from '../redux/actions/location';
import {getFriendLocation} from '../redux/actions/friend';
import {Item, Thumbnail} from 'native-base';
import io from 'socket.io-client';

class MapsScreen extends Component {
  state = {
    latitude: -6.9370126,
    longitude: 106.8822903,
    markers: [],
  };
  requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  };
  getMarker = () => {
    const token = this.props.auth.data.token;
    this.props
      .dispatch(getFriendLocation(token))
      .then(async (res) => {
        await this.setState({
          markers: res.action.payload.data.data,
        });
      })
      .catch((err) => console.log(err));
  };
  updateLocation = () => {
    const token = this.props.auth.data.token;
    const data = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    this.props
      .dispatch(updateLocation(token, data))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  componentDidMount = async () => {
    await this.requestPermissions();
    await Geolocation.getCurrentPosition(
      async (position) => {
        console.log(position);
        await this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.updateLocation();
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    this.getMarker();
    this.socket = io(`${API_URL}`);
    this.socket.on('add-friend', (data) => {
      console.log(data);
      if (data.relating_user_id) {
        this.getMarker();
      }
    });
  };
  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          showsUserLocation={true}
          followsUserLocation
          showsMyLocationButton={true}
          region={{
            latitude: this.state.latitude || 0,
            longitude: this.state.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {this.state.markers.map((marker) => (
            <Marker
              coordinate={{
                latitude: parseFloat(marker.latitude),
                longitude: parseFloat(marker.longitude),
              }}
              key={marker.id}
              title={marker.name}>
              <Item rounded>
                {marker.image == 'null' ? (
                  <Thumbnail source={require('../assets/images/avatar.jpg')} />
                ) : (
                  <Thumbnail source={{uri: API_URL + 'img/' + marker.image}} />
                )}
              </Item>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(MapsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
