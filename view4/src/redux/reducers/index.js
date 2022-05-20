import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import success from './success';
import products from "./products";
import lots from './lots';
import bids from './bids';
import dashboard from './dashboard';

const rootReducer = combineReducers({
    index: (state={}, action) => {
        switch (action.type) {
            case HYDRATE:
                return {
                    ...state,
                    ...action.payload
                };
            default:
                return state;
        }
    },
    bids,
    lots,
    success,
    products,
    dashboard
});

export default rootReducer;