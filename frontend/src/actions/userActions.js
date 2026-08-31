import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,

} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        //call reducer which makes loading true 
        dispatch({ type: USER_LOGIN_REQUEST });

        // database work while loading 
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            `http://localhost:5000/api/users/login`,
            { email, password },
            config
        );

        // now call reducer to make loading false and sending payload with received data 
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};


