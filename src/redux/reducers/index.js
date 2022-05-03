import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import success from './success';
import products from "./products";
import lots from './lots';
import bids from './bids';

// getInitialProps 등에서 리덕스 스토어에 접근하려면 hydrate 필요
// api (axios) 사용하면 필요 없나?
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
    products
});

export default rootReducer;