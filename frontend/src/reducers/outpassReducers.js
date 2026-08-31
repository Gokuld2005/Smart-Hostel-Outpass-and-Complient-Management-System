import {

    OUTPASS_CREATE_FAIL,
    OUTPASS_CREATE_REQUEST,
    OUTPASS_CREATE_SUCCESS,

    OUTPASS_LIST_FAIL,
    OUTPASS_LIST_REQUEST,
    OUTPASS_LIST_SUCCESS,
}
    from "../constants/outpassConstants";


export const outpassListReducer = (state = { outpasses: [] }, action) => {
    switch (action.type) {
        case OUTPASS_LIST_REQUEST:
            return { loading: true };
        case OUTPASS_LIST_SUCCESS:
            return { loading: false, outpasses: action.payload };
        case OUTPASS_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};


export const outpassCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case OUTPASS_CREATE_REQUEST:
            return { loading: true };
        case OUTPASS_CREATE_SUCCESS:
            return { loading: false, success: true };
        case OUTPASS_CREATE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};