import { types } from "../types/types";

const initialState = {};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        // Set the state value with credentials received
        uid: action.payload.uid,
        name: action.payload.displayName,
      };

    case types.logout:
      // Flush the data
      return {};

    default:
      return state;
  }
};
