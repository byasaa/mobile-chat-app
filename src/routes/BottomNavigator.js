import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomeScreen, FriendScreen, MapsScreen, UserScreen} from '../screens';
import {Thumbnail} from 'native-base';
const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#F36162',
        inactiveTintColor: 'black',
        style: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          height: 50,
          shadowOffset: {width: 3, height: 5},
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({color}) => (
            <Icon name="comment-alt" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Friend"
        component={FriendScreen}
        options={{
          tabBarLabel: 'Friend',
          tabBarIcon: ({color}) => (
            <Icon name="user-friends" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={MapsScreen}
        options={{
          tabBarLabel: 'Maps',
          tabBarIcon: ({color}) => (
            <Icon name="map-marker-alt" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: () => (
            <Thumbnail
              avatar
              source={require('../assets/images/avatar.jpg')}
              style={{height: 24, width: 24}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
