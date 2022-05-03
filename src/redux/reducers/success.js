export const initialState = {
    success:[],
    bid_sn: [],
    successDetails: []
}

export const LOAD_SUCCESS_DATA_REQUEST = "LOAD_SUCCESS_DATA_REQUEST";
export const LOAD_SUCCESS_DATA_SUCCESS = "LOAD_SUCCESS_DATA_SUCCESS";
export const LOAD_SUCCESS_DATA_FAILURE = "LOAD_SUCCESS_DATA_FAILURE";
export const BID_SN_CHANGE = "BID_SN_CHANGE";

export const LOAD_SUCCESS_DETAIL_REQUEST = "LOAD_SUCCESS_DETAIL_REQUEST";
export const LOAD_SUCCESS_DETAIL_SUCCESS = "LOAD_SUCCESS_DETAIL_SUCCESS";
export const LOAD_SUCCESS_DETAIL_FAILURE = "LOAD_SUCCESS_DETAIL_FAILURE";

// 리듀서 함수 만들기 
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case BID_SN_CHANGE:  
            console.log("action", action) 
            const bid_sn = action.bid_sn;   
            return {
                ...state, 
                bid_sn
            };
        case LOAD_SUCCESS_DATA_REQUEST:
            return {...state};
        case LOAD_SUCCESS_DATA_SUCCESS:
            console.log(action.data.data);
            const success = action.data.data;
            return {...state, success};
        case LOAD_SUCCESS_DATA_FAILURE:
            return {...state};

        case LOAD_SUCCESS_DETAIL_REQUEST:
            return {...state};
        case LOAD_SUCCESS_DETAIL_SUCCESS:
            console.log("@@@@",action.data.data)
            const successDetails = action.data.data;
            return {...state, successDetails};
        case LOAD_SUCCESS_DETAIL_FAILURE:
            return {...state};
        default:
            return state;
    }
}

export default reducer;