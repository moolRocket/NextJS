import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

const local_v2 = "http://192.168.0.251:9090/v2"
const gcp_v2 = "http://34.64.172.190:9090/v2"

async function progressStatus () {
    console.log("2> progressStatus");
    return await axios({
        method:"GET",
        url: `${gcp_v2}/bid/find-graph-bid`,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
}
function* loadProgressStatus(action) {
    try {
        console.log("1> load progress status", action);
        const result = yield call (progressStatus, action);
        console.log("3> load progress status result", result);
        yield put ({type: 'LOAD_PROGRESS_STATUS_SUCCESS', data: result.data});
    } catch (e) {
        console.error(e);
        yield put ({type: 'LOAD_PROGRESS_STATUS_FAILURE', e});
    }
};
function* lastLoadProgressStatus() {
    yield takeLatest('LOAD_PROGRESS_STATUS_REQUEST', loadProgressStatus);
}

async function performance () {
    console.log("2> performance");
    return await axios({
        method: "GET",
        url: `${gcp_v2}/bid/find-performance`,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
}
function* loadPerformance (action) {
    try {
        console.log("1> load performance", action);
        const result = yield call (performance, action);
        console.log("3> result", result);
        yield put ({type:'LOAD_PERFORMANCE_SUCCESS', data: result.data})
    } catch (e) {
        yield put ({type: 'LOAD_PERFORMANCE_FAILURE', e})
    }
};
function* lastLoadPerformance() {
    yield takeLatest ('LOAD_PERFORMANCE_REQUEST', loadPerformance);
}


async function autoLotData2() {
    console.log("2> autoLotData2 axios:")
    return await axios.get(
        'http://34.64.172.190:9090/v1/lot/auto-create-lot',
        {
            header: 'application/json'
        }
    )
}
function* autoLotData1(action) {
    try {
        console.log('1> autoLot action:', action)
        const result = yield call(autoLotData2);
        console.log('3> autoLot result:', result.data)
        yield put({type:'AUTO_LOT_UP_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'AUTO_LOT_UP_FAILURE', e});
    }
};
function* autoLotData() {
    yield takeLatest('AUTO_LOT_UP', autoLotData1);
};

async function maunalLotData2() {
    console.log("2> maunal axios:")
    return await axios.get(
        'http://34.64.172.190:9090/v1/lot/normal-create-lot',
        {
            header: 'application/json'
        }
    )
}

function* maunalLotData1(action) {
    try {
        console.log('1> maunal request action:', action)
        const result = yield call(maunalLotData2);
        console.log('3> maunal result:', result)
        yield put({type:'MANUAL_LOT_UP_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'MANUAL_LOT_UP_FAILURE', e});
    }
};

function* maunalLotData() {
    yield takeLatest('MANUAL_LOT_UP', maunalLotData1);
};

async function averageLotData2() {
    console.log("2> averageLotData1 axios:")
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v1/lot/makeup-product`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}

function* averageLotData1(action) {
    try {
        console.log('1> averageLotData1 request action:', action)
        const result = yield call(averageLotData2);
        console.log('3> averageLotData1:', result)
        console.log('4> averageLotData1:', result.data)
        yield put({type:'AVERGE_LOT_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'AVERGE_LOT_FAILURE', e});
    }
};

function* averageLotData() {
    yield takeLatest('AVERGE_LOT_REQUEST', averageLotData1);
};

async function dispatchNumData2() {
    console.log("2> dispatch axios:")
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v2/bid/find-wait-dispatch`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}

function* dispatchNumData1(action) {
    try {
        console.log('1> dispatch request action:', action)
        const result = yield call(dispatchNumData2);
        console.log('3> dispatch result:', result)
        yield put({type:'DISPATCH_NUM_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'DISPATCH_NUM_FAILURE', e});
    }
};

function* dispatchNumData() {
    yield takeLatest('DISPATCH_NUM_REQUEST', dispatchNumData1);
};

export default function* loadDashboard() {
    yield all ([
        fork(lastLoadProgressStatus),
        fork(lastLoadPerformance),
        fork(autoLotData),
        fork(maunalLotData),
        fork(averageLotData),
        fork(dispatchNumData)
    ])
}