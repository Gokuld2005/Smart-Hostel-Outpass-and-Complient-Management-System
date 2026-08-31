import {

    REGISTER_CREATE_FAIL,
    REGISTER_CREATE_REQUEST,
    REGISTER_CREATE_SUCCESS,

    REGISTER_LIST_FAIL,
    REGISTER_LIST_REQUEST,
    REGISTER_LIST_SUCCESS,
}
    from "../constants/registerConstants";


export const registerListReducer = (state = { registeres: [] }, action) => {
    switch (action.type) {
        case REGISTER_LIST_REQUEST:
            return { loading: true };
        case REGISTER_LIST_SUCCESS:
            return { loading: false, registers: action.payload };
        case REGISTER_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
