import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Alert} from 'react-native';
import {Form, Input, Button, Item, Toast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {register} from '../../redux/actions/auth';

class RegisterScreen extends Component {
  state = {
    username: '',
    password: '',
    passwordSecure: true,
  };
  regUser = (e) => {
    if (this.state.username === '' || this.state.password === '') {
      Alert.alert('Register', 'Username or Password Invalid', [{text: 'Ok'}], {
        cancelable: false,
      });
    } else {
      e.preventDefault();
      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      this.props
        .dispatch(register(data))
        .then((res) => {
          console.log(res);
          Alert.alert('Register', 'Success', [{text: 'Ok'}], {
            cancelable: false,
          });
          this.props.navigation.replace('Login');
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(
            'Register',
            'Something Wrong I can Feel It',
            [{text: 'Ok'}],
            {
              cancelable: false,
            },
          );
        });
    }
  };
  render() {
    let eye = this.state.passwordSecure ? 'eye-slash' : 'eye';
    return (
      <View style={styles.container}>
        <View style={{marginTop: 100}}>
          <Text style={{width: 300, fontSize: 50}}>Create New account</Text>
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
                onPress={this.regUser}
                rounded
                style={{width: '100%', backgroundColor: '#F36162', height: 50}}>
                <Text
                  style={{color: '#ffffff', alignSelf: 'center', fontSize: 20}}>
                  Register
                </Text>
              </Button>
            </Item>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>Already have Account? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.replace('Login')}>
                <Text
                  style={{fontStyle: 'italic', color: '#f36162', fontSize: 18}}>
                  Login
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
  register: state.register,
});

export default connect(mapStateToProps)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingLeft: 20,
  },
});
