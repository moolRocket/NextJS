export const initialState = {
    lot_sn: [],
    lots:[],
    lotDetails: []
}
export const LOAD_LOTS_DATA_REQUEST = "LOAD_LOTS_DATA_REQUEST";
export const LOAD_LOTS_DATA_SUCCESS = "LOAD_LOTS_DATA_SUCCESS";
export const LOAD_LOTS_DATA_FAILURE = "LOAD_LOTS_DATA_FAILURE";
export const LOT_SN_CHANGE = "LOT_SN_CHANGE";

export const LOAD_LOTS_DETAIL_REQUEST = "LOAD_LOTS_DETAIL_REQUEST";
export const LOAD_LOTS_DETAIL_SUCCESS = "LOAD_LOTS_DETAIL_SUCCESS";
export const LOAD_LOTS_DETAIL_FAILURE = "LOAD_LOTS_DETAIL_FAILURE";

// 리듀서 함수 만들기 
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LOT_SN_CHANGE:  
            console.log("action", action) 
            const lot_sn = action.lot_sn;   
            return {
                ...state,
                lot_sn
            };
        case LOAD_LOTS_DATA_REQUEST:
            return {...state};
        case LOAD_LOTS_DATA_SUCCESS:
            console.log(action.data.data);
            const lots = action.data.data;
            return {...state, lots};
        case LOAD_LOTS_DATA_FAILURE:
            return {...state};
            
        case LOAD_LOTS_DETAIL_REQUEST:
            return {...state};
        case LOAD_LOTS_DETAIL_SUCCESS:
            console.log("@@@@",action.data.data)
            const lotDetails = action.data.data;
            return {...state, lotDetails};
        case LOAD_LOTS_DATA_FAILURE:
            return {...state};
        default:
            return state;
    }
}
export default reducer;