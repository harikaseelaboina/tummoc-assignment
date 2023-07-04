const initialState = {};

const cookieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COOKIE_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default cookieReducer;
