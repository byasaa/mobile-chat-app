import React, {Component} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
import {connect} from 'react-redux';
import {refresh, logout} from '../redux/actions/auth';
import {destroy} from '../redux/actions/profile';

class SplashScreen extends Component {
  state = {
    loadingSpinner: true,
    redirect: '',
  };
  componentDidMount = async () => {
    // await this.props.dispatch(logout());
    const data = {
      token: this.props.auth.data.refreshToken,
    };
    await this.props
      .dispatch(refresh(data))
      .then((res) => {
        console.log(res);
        this.props.navigation.replace('Home');
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        this.props.dispatch(logout());
        this.props.dispatch(destroy());
        this.props.navigation.replace('Login');
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/wa.png')}
          style={{top: -70, height: 150, width: 150}}
        />
        <Text style={styles.logoText}>ChatApp</Text>
        {this.state.loadingSpinner === true && <Spinner />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebecf1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'black',
    fontFamily: 'Inter-Thin',
    fontSize: 30,
    marginTop: 170,
    fontWeight: '300',
  },
});
