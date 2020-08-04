import axios from 'axios';
import {API_URL} from '@env';
export const getLastMessage = (token) => {
  return {
    type: 'LAST_MESSAGE',
    payload: axios({
      method: 'GET',
      url: API_URL + 'message/last',
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const getPersonalMessage = (token, friendId) => {
  return {
    type: 'PERSONAL_MESSAGE',
    payload: axios({
      method: 'GET',
      url: API_URL + 'message/' + friendId,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const sendPersonalMessage = (token, data) => {
  return {
    type: 'SEND_MESSAGE',
    payload: axios({
      method: 'POST',
      url: API_URL + 'message/',
      headers: {
        Authorization: token,
      },
      data: data,
    }),
  };
};
