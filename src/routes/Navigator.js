import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import {
  SplashScreen,
  RegisterScreen,
  LoginScreen,
  ChatScreen,
  AddProfileScreen,
  EditProfileScreen,
  FriendProfile,
} from '../screens';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

function Navigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          options={{headerShown: false}}
          component={SplashScreen}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={BottomNavigator}
        />
        <Stack.Screen
          name="FriendProfile"
          options={{headerShown: false}}
          component={FriendProfile}
        />
        <Stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="AddProfile"
          options={{headerShown: false}}
          component={AddProfileScreen}
        />
        <Stack.Screen
          name="EditProfile"
          options={{headerShown: false}}
          component={EditProfileScreen}
        />
        <Stack.Screen
          name="Chat"
          options={{headerShown: false}}
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Navigator);
