import axios from 'axios';
import {API_URL} from '@env';

export const updateLocation = (token, data) => {
  return {
    type: 'UPDATE_LOCATION',
    payload: axios({
      method: 'PUT',
      url: API_URL + 'location/',
      data: data,
      headers: {
        Authorization: token,
      },
    }),
  };
};
