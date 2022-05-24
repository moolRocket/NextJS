export const initialState = {
    progressStatus : {data:[{COUNT:11}, {COUNT:34}, {COUNT:55}]},
    performance: {
        data: {
            "lastweek":[
                { '날짜': '2022-05-16', '금액': 54000 },
                { '날짜': '2022-05-17', '금액': 27500 },
                { '날짜': '2022-05-18', '금액': 234700 },
                { '날짜': '2022-05-19', '금액': 0 },
                { '날짜': '2022-05-20', '금액': 36000 },
                { '날짜': '2022-05-21', '금액': 68900 },
                { '날짜': '2022-05-22', '금액': 0 }
              ], 
            "thisweek":[
                { '날짜': '2022-05-23', '금액': 108000 },
                { '날짜': '2022-05-24', '금액': 62200 },
                { '날짜': '2022-05-25', '금액': 0 },
                { '날짜': '2022-05-26', '금액': 0 },
                { '날짜': '2022-05-27', '금액': 0 },
                { '날짜': '2022-05-28', '금액': 0 },
                { '날짜': '2022-05-29', '금액': 0 }
              ]}},
            
    autoLotNum:'62',
    manualLotNum:'17',
    averageNum:'2',
    waitingForDispatch:'42'
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

export const AVERGE_LOT_REQUEST = "AVERGE_LOT_REQUEST";
export const AVERGE_LOT_SUCCESS = "AVERGE_LOT_SUCCESS";
export const AVERGE_LOT_FAILURE = "AVERGE_LOT_FAILURE";

export const DISPATCH_NUM_REQUEST = "DISPATCH_NUM_REQUEST";
export const DISPATCH_NUM_SUCCESS = "DISPATCH_NUM_SUCCESS";
export const DISPATCH_NUM_FAILURE = "DISPATCH_NUM_FAILURE";

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PROGRESS_STATUS_REQUEST:
            return {...state};
        case LOAD_PROGRESS_STATUS_SUCCESS:
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

        case AVERGE_LOT_REQUEST:
            return {...state};
        case AVERGE_LOT_SUCCESS:
            const averageNum = action.data.data;
            return {...state, averageNum};
        case AVERGE_LOT_FAILURE:
            return {...state};
        case DISPATCH_NUM_REQUEST:
            return {...state};
        case DISPATCH_NUM_SUCCESS:
            const waitingForDispatch = action.data.data;
            return {...state, waitingForDispatch};
        case DISPATCH_NUM_FAILURE:
            return {...state};

        default:
            return state;
    }
}

export default reducer;