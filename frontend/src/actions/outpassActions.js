import axios from "axios";
import {
    OUTPASS_CREATE_FAIL,
    OUTPASS_CREATE_REQUEST,
    OUTPASS_CREATE_SUCCESS,

    OUTPASS_LIST_FAIL,
    OUTPASS_LIST_REQUEST,
    OUTPASS_LIST_SUCCESS,

}
    from "../constants/outpassConstants";

export const listOutpassStudent = (objectId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OUTPASS_LIST_REQUEST,
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
        const { data } = await axios.get(`http://localhost:5000/api/outpass?objectId=${objectId}`,config); 

       

        dispatch({
            type: OUTPASS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: OUTPASS_LIST_FAIL,
            payload: message,
        });
    }
};


export const listOutpassFaculty = (objectId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OUTPASS_LIST_REQUEST,
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

        const { data } = await axios.get(`http://localhost:5000/api/outpass/faculty?objectId=${objectId}`, config); 

        // console.log(data);

        dispatch({
            type: OUTPASS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: OUTPASS_LIST_FAIL,
            payload: message,
        });
    }
};

export const listOutpassWarden = (objectId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OUTPASS_LIST_REQUEST,
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

        const { data } = await axios.get(`http://localhost:5000/api/outpass/warden?objectId=${objectId}`, config); 

        console.log("data:",data);

        dispatch({
            type: OUTPASS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: OUTPASS_LIST_FAIL,
            payload: message,
        });
    }
};

export const listOutpassSecurity = (qrCode) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OUTPASS_LIST_REQUEST,
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

        const { data } = await axios.get(`http://localhost:5000/api/qr/?qrCode=${qrCode}`, config); 

        console.log("data:",data);

        dispatch({
            type: OUTPASS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: OUTPASS_LIST_FAIL,
            payload: message,
        });
    }
};



export const createOutpassAction = (studentId,from, to, reason, place) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: OUTPASS_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        console.log(userInfo);
        const { data } = await axios.post(
            `http://localhost:5000/api/outpass`,
            { studentId, from, to, reason, place },
            config
        );

        dispatch({
            type: OUTPASS_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: OUTPASS_CREATE_FAIL,
            payload: message,
        });
    }
};