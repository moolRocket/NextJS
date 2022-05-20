export const initialState = {
    success:[],
    bidding:[],
    bid_sn: [],
    inputStatus: [],
    successDetails: []
}

export const LOAD_SUCCESS_DATA_REQUEST = "LOAD_SUCCESS_DATA_REQUEST";
export const LOAD_SUCCESS_DATA_SUCCESS = "LOAD_SUCCESS_DATA_SUCCESS";
export const LOAD_SUCCESS_DATA_FAILURE = "LOAD_SUCCESS_DATA_FAILURE";

export const LOAD_BIDDING_DATA_REQUEST = "LOAD_BIDDING_DATA_REQUEST";
export const LOAD_BIDDING_DATA_SUCCESS = "LOAD_BIDDING_DATA_SUCCESS";
export const LOAD_BIDDING_DATA_FAILURE = "LOAD_BIDDING_DATA_FAILURE";

export const BID_SN_CHANGE = "BID_SN_CHANGE";
export const INPUT_STATUS_REQUEST = "INPUT_STATUS_REQUEST";

export const LOAD_SUCCESS_DETAIL_REQUEST = "LOAD_SUCCESS_DETAIL_REQUEST";
export const LOAD_SUCCESS_DETAIL_SUCCESS = "LOAD_SUCCESS_DETAIL_SUCCESS";
export const LOAD_SUCCESS_DETAIL_FAILURE = "LOAD_SUCCESS_DETAIL_FAILURE";

// 리듀서 함수 만들기 
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case BID_SN_CHANGE:
            const bid_sn = action.bid_sn;   
            return {
                ...state, 
                bid_sn
            };
        case INPUT_STATUS_REQUEST:
            const inputStatus = action.inputStatus;
            console.log("inputStatus!!!!!!@#!@#!@#!@#!@#!@#", inputStatus)
            return {
                ...state, 
                inputStatus
            };
        case LOAD_SUCCESS_DATA_REQUEST:
            return {...state};
        case LOAD_SUCCESS_DATA_SUCCESS:
            const success = action.data.data;
            return {...state, success};
        case LOAD_SUCCESS_DATA_FAILURE:
            return {...state};

        case LOAD_BIDDING_DATA_REQUEST:
            return {...state};
        case LOAD_BIDDING_DATA_SUCCESS:
            const bidding = action.data.data;
            console.log("2번째 비딩 확인", bidding)
            return {...state, bidding};
        case LOAD_BIDDING_DATA_FAILURE:
            return {...state};

        case LOAD_SUCCESS_DETAIL_REQUEST:
            return {...state};
        case LOAD_SUCCESS_DETAIL_SUCCESS:
            const successDetails = action.data.data;
            return {...state, successDetails};
        case LOAD_SUCCESS_DETAIL_FAILURE:
            return {...state};
        default:
            return state;
    }
}

export default reducer;