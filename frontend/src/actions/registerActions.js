import axios from "axios";
import {
 
  REGISTER_LIST_FAIL,
  REGISTER_LIST_REQUEST,
  REGISTER_LIST_SUCCESS,
} from "../constants/registerConstants";

export const listRegister = (objectId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REGISTER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log("USERINFO", userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("outpass Action student ID : ",studentId);
    const { data } = await axios.get(
  `http://localhost:5000/api/qr/entries`,
  config
);

    dispatch({
      type: REGISTER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: REGISTER_LIST_FAIL,
      payload: message,
    });
  }
};
