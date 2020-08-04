import axios from 'axios';
import {API_URL} from '@env';
export const getUserProfile = (token, user_id) => {
  return {
    type: 'USER_PROFILE',
    payload: axios({
      method: 'GET',
      url: API_URL + 'profile/' + user_id,
      headers: {
        Authorization: token,
      },
    }),
  };
};
export const addProfile = (formData, token) => {
  return {
    type: 'ADD_PROFILE',
    payload: axios({
      method: 'POST',
      url: API_URL + 'profile/',
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    }),
  };
};
export const editProfile = (formData, token, id) => {
  return {
    type: 'EDIT_PROFILE',
    payload: axios({
      method: 'PUT',
      url: API_URL + 'profile/' + id,
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    }),
  };
};

export const destroy = () => {
  return {
    type: 'DESTROY',
  };
};
