import axios from 'axios';
import {API_URL} from '@env';

export const searchUser = (token, search) => {
  return {
    type: 'SEARCH',
    payload: axios({
      method: 'GET',
      url: API_URL + 'friend/search',
      headers: {
        Authorization: token,
      },
      params: {
        search: search,
      },
    }),
  };
};
export const addFriend = (token, friendId) => {
  return {
    type: 'ADD_FRIEND',
    payload: axios({
      method: 'POST',
      url: API_URL + 'friend/' + friendId,
      headers: {
        Authorization: token,
      },
    }),
  };
};
export const getAllFriend = (token) => {
  return {
    type: 'ALL_FRIEND',
    payload: axios({
      method: 'GET',
      url: API_URL + 'friend/all',
      headers: {
        Authorization: token,
      },
    }),
  };
};
export const getFriendLocation = (token) => {
  return {
    type: 'LOCATION',
    payload: axios({
      method: 'GET',
      url: API_URL + 'friend/location',
      headers: {
        Authorization: token,
      },
    }),
  };
};
