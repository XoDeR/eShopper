import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    // TODO add FireBase auth with email + pw here
  } catch (err) {
    dispatch(loginFailure());
  }
};
