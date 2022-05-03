export const initialState = {
    bid_sn: [],
    bids:[],
    bidDetails: [],
    price: '',
    bcp_sn: '',
    search_date: ['', '']
}

export const LOAD_BIDS_DATA_REQUEST = "LOAD_BIDS_DATA_REQUEST";
export const LOAD_BIDS_DATA_SUCCESS = "LOAD_BIDS_DATA_SUCCESS";
export const LOAD_BIDS_DATA_FAILURE = "LOAD_BIDS_DATA_FAILURE";
export const BID_SN_CHANGE = "BID_SN_CHANGE";
export const PRICE_CHANGE = "PRICE_CHANGE";
export const SEARCH_DATE = "SEARCH_DATE";

export const LOAD_CHANGE_PRICE_REQUEST = "LOAD_CHANGE_PRICE_REQUEST";
export const LOAD_CHANGE_PRICE_SUCCESS = "LOAD_CHANGE_PRICE_SUCCESS";
export const LOAD_CHANGE_PRICE_FAILURE = "LOAD_CHANGE_PRICE_FAILURE";

export const LOAD_BIDS_DETAIL_REQUEST = "LOAD_BIDS_DETAIL_REQUEST";
export const LOAD_BIDS_DETAIL_SUCCESS = "LOAD_BIDS_DETAIL_SUCCESS";
export const LOAD_BIDS_DETAIL_FAILURE = "LOAD_BIDS_DETAIL_FAILURE";

export const MAKE_SUCCESS_DATA_REQUEST = "MAKE_SUCCESS_DATA_REQUEST";
export const MAKE_SUCCESS_DATA_SUCCESS = "MAKE_SUCCESS_DATA_SUCCESS";
export const MAKE_SUCCESS_DATA_FAILURE = "MAKE_SUCCESS_DATA_FAILURE";

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
        case PRICE_CHANGE: 
            const price = action.price;
            const bcp_sn = action.bcp_sn;
            return { ...state, price, bcp_sn };
        case SEARCH_DATE:
            console.log("***>>>>", action.date);
            const search_date = action.date;
            return { ...state, search_date};
            
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

        case LOAD_CHANGE_PRICE_REQUEST:
            return {...state};
        case LOAD_CHANGE_PRICE_SUCCESS:
            console.log("change",action.data.data);
            return {...state};
        case LOAD_CHANGE_PRICE_FAILURE:
            return {...state};

        case MAKE_SUCCESS_DATA_REQUEST:
            return {...state};
        case MAKE_SUCCESS_DATA_SUCCESS:
            console.log("make success",action.data.data);
            return {...state};
        case MAKE_SUCCESS_DATA_FAILURE:
            return {...state};
        default:
            return state;
    }
}


export default reducer;