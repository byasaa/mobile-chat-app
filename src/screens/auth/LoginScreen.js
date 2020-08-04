import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Form, Input, Button, Item, Toast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth';
import {getUserProfile} from '../../redux/actions/profile';

class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
    passwordSecure: true,
  };
  loginUser = (e) => {
    if (this.state.username === '' || this.state.password === '') {
      Toast.show({
        text: 'Username or Password is Required',
        type: 'danger',
        position: 'bottom',
      });
    } else {
      e.preventDefault();
      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      this.props
        .dispatch(login(data))
        .then(async (res) => {
          console.log(res);
          Toast.show({
            text: 'Success',
            type: 'success',
            position: 'top',
          });
          await this.props
            .dispatch(
              getUserProfile(
                res.action.payload.data.data[0].token,
                res.action.payload.data.data[0].id,
              ),
            )
            .then((res) => {
              console.log(res);
              if (res.action.payload.data.data[0]) {
                this.props.navigation.replace('Home');
              } else {
                this.props.navigation.replace('AddProfile');
              }
            });
        })
        .catch((err) => {
          console.log(err);
          Toast.show({
            text: 'Username or Password is Invalid',
            type: 'danger',
            position: 'bottom',
          });
        });
    }
  };
  render() {
    let eye = this.state.passwordSecure ? 'eye-slash' : 'eye';
    return (
      <View style={styles.container}>
        <View style={{marginTop: 100}}>
          <Text style={{width: 350, fontSize: 50}}>
            Welcome Back, Please Login
          </Text>
        </View>
        <View>
          <Form style={{paddingRight: 20, marginTop: 30}}>
            <Item
              regular
              style={{paddingLeft: 20, marginTop: 20, paddingRight: 20}}>
              <Icon name="user" size={20} />
              <Input
                placeholder="Username"
                value={this.state.username}
                onChangeText={(val) => this.setState({username: val})}
                style={{paddingLeft: 20, paddingRight: 40}}
              />
            </Item>
            <Item
              regular
              style={{paddingLeft: 20, marginTop: 20, paddingRight: 20}}>
              <Icon name="lock" size={20} />
              <Input
                placeholder="Password"
                secureTextEntry={this.state.passwordSecure}
                value={this.state.password}
                onChangeText={(val) => this.setState({password: val})}
                style={{paddingLeft: 20, paddingRight: 20}}
              />
              <Button
                transparent
                onPress={() =>
                  this.setState({passwordSecure: !this.state.passwordSecure})
                }>
                <Icon name={`${eye}`} size={20} />
              </Button>
            </Item>
            <Item regular style={{marginTop: 20, marginBottom: 40}}>
              <Button
                block
                rounded
                onPress={this.loginUser}
                style={{width: '100%', backgroundColor: '#F36162', height: 50}}>
                <Text
                  style={{color: '#ffffff', alignSelf: 'center', fontSize: 20}}>
                  Login
                </Text>
              </Button>
            </Item>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>Don't have an Account? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.replace('Register')}>
                <Text
                  style={{fontStyle: 'italic', color: '#f36162', fontSize: 18}}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingLeft: 20,
  },
});
