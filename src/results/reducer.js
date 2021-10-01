import {
    RESULTS_FETCH_INIT,
    RESULTS_FETCH_SUCCESS,
    RESULTS_FETCH_FAILURE
} from "./actions";

const resultsReducer = (state, action) => {
    switch (action.type) {
        case RESULTS_FETCH_INIT:
            return {
                ...state,
                isLoading: true
            };
        case RESULTS_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case RESULTS_FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default: throw new Error("Unhandled results fetch action")
    };
}

export default resultsReducer;