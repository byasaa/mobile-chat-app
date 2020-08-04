const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: [],
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case 'LAST_MESSAGE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'LAST_MESSAGE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'LAST_MESSAGE_FULFILLED':
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    case 'PERSONAL_MESSAGE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'PERSONAL_MESSAGE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'PERSONAL_MESSAGE_FULFILLED':
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
      };
    case 'SEND_MESSAGE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'SEND_MESSAGE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Reject',
      };
    case 'SEND_MESSAGE_FULFILLED':
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

export default message;
