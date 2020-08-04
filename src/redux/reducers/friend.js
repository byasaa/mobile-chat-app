const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: [],
};

const friend = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_FRIEND_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'ALL_FRIEND_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'ALL_FRIEND_FULFILLED':
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    default:
      return state;
  }
};

export default friend;
