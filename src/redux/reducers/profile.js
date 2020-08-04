const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_PROFILE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'USER_PROFILE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'USER_PROFILE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    case 'ADD_PROFILE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'ADD_PROFILE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'ADD_PROFILE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    case 'EDIT_PROFILE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'EDIT_PROFILE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'EDIT_PROFILE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    case 'DESTROY':
      return {
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: {},
      };
    default:
      return state;
  }
};

export default profile;
