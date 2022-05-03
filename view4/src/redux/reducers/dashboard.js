export const initialState = {
    progressStatus : {data:[{COUNT:3}, {COUNT:3}, {COUNT:3}]},
    performance: {
        data: {
            "lastweek":[{"날짜": "", "금액": "0"}], 
            "thisweek":[{"날짜": "", "금액": "0"}]}},
            
    autoLotNum:'0',
    manualLotNum:'0',
    averageNum:'0',
    averagePrice:'0'
}

export const LOAD_PROGRESS_STATUS_REQUEST = 'LOAD_PROGRESS_STATUS_REQUEST';
export const LOAD_PROGRESS_STATUS_SUCCESS = 'LOAD_PROGRESS_STATUS_SUCCESS';
export const LOAD_PROGRESS_STATUS_FAILURE = 'LOAD_PROGRESS_STATUS_FAILURE';

export const LOAD_PERFORMANCE_REQUEST = 'LOAD_PERFORMANCE_REQUEST';
export const LOAD_PERFORMANCE_SUCCESS = 'LOAD_PERFORMANCE_SUCCESS';
export const LOAD_PERFORMANCE_FAILURE = 'LOAD_PERFORMANCE_FAILURE';

export const AUTO_LOT_UP = "AUTO_LOT_UP";
export const AUTO_LOT_UP_SUCCESS = "AUTO_LOT_UP_SUCCESS";
export const AUTO_LOT_UP_FAILURE = "AUTO_LOT_UP_FAILURE";

export const MANUAL_LOT_UP = "MANUAL_LOT_UP";
export const MANUAL_LOT_UP_SUCCESS = "MANUAL_LOT_UP_SUCCESS";
export const MANUAL_LOT_UP_FAILURE = "MANUAL_LOT_UP_FAILURE";

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PROGRESS_STATUS_REQUEST:
            console.log("여기임> dashboard reducer==")
            return {...state};
        case LOAD_PROGRESS_STATUS_SUCCESS:
            console.log("여기임> dashboard reducer", action)
            const progressStatus = action.data;
            return {...state, progressStatus}
        case LOAD_PROGRESS_STATUS_FAILURE:
            return {...state}

        case LOAD_PERFORMANCE_REQUEST:
            return {...state};
        case LOAD_PERFORMANCE_SUCCESS:
            const performance= action.data;
            return {...state, performance}
        case LOAD_PERFORMANCE_FAILURE:
            return {...state}

            
        case AUTO_LOT_UP:
            return {...state};
        case AUTO_LOT_UP_SUCCESS:
            const autoLotNum = action.data.data;
            return {...state, autoLotNum};
        case AUTO_LOT_UP_FAILURE:
            return {...state};
        case MANUAL_LOT_UP:
            return {...state};
        case MANUAL_LOT_UP_SUCCESS:
            const manualLotNum = action.data.data;
            return {...state, manualLotNum};
        case MANUAL_LOT_UP_FAILURE:
            return {...state};

        default:
            return state;
    }
}

export default reducer;