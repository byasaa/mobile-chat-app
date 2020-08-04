import axios from 'axios';
import {API_URL} from '@env';
export const getLastMessage = (token) => {
  return {
    type: 'LAST_MESSAGE',
    payload: axios({
      method: 'POST',
      url: API_URL + 'message/',
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
getAllFriend;
