export const initialState = {
    bid_sn: [],
    bids:[],
    bidDetails: []
}

export const LOAD_BIDS_DATA_REQUEST = "LOAD_BIDS_DATA_REQUEST";
export const LOAD_BIDS_DATA_SUCCESS = "LOAD_BIDS_DATA_SUCCESS";
export const LOAD_BIDS_DATA_FAILURE = "LOAD_BIDS_DATA_FAILURE";
export const BID_SN_CHANGE = "BID_SN_CHANGE";

export const LOAD_BIDS_DETAIL_REQUEST = "LOAD_BIDS_DETAIL_REQUEST";
export const LOAD_BIDS_DETAIL_SUCCESS = "LOAD_BIDS_DETAIL_SUCCESS";
export const LOAD_BIDS_DETAIL_FAILURE = "LOAD_BIDS_DETAIL_FAILURE";

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
        case LOAD_BIDS_DATA_REQUEST:
            return {...state};
        case LOAD_BIDS_DATA_SUCCESS:
            console.log(action.data.data);
            const bids = action.data.data;
            return {...state, bids};
        case LOAD_BIDS_DATA_FAILURE:
            return {...state};

        case LOAD_BIDS_DETAIL_REQUEST:
            return {...state};
        case LOAD_BIDS_DETAIL_SUCCESS:
            console.log("@@@@",action.data.data)
            const bidDetails = action.data.data;
            return {...state, bidDetails};
        case LOAD_BIDS_DETAIL_FAILURE:
            return {...state};
        default:
            return state;
    }
}


export default reducer;