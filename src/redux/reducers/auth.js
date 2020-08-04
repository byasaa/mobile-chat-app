const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  isLogin: false,
  data: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: true,
        data: action.payload.data.data[0],
      };
    case 'REGISTER_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: false,
        errorMsg: '',
        data: {},
      };
    case 'REFRESH_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'REFRESH_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: action.payload,
      };
    case 'REFRESH_FULFILLED':
      const data = {...state.data};
      data.token = action.payload.data.data.token;
      data.refreshToken = action.payload.data.data.refreshToken;
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: {...data},
      };
    default:
      return state;
  }
};

export default auth;
