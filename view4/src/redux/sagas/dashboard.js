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
        console.log("######1> load progress status", action);
        const result = yield call (progressStatus, action);
        console.log("3> result", result);
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
    console.log("2> axios:")
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v1/lot/auto-create-lot`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}
function* autoLotData1(action) {
    try {
        console.log('1> request action:', action)
        const result = yield call(autoLotData2);
        console.log('3> result:', result.data)
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
    console.log("2> axios:")
    return await axios.get(
        'http://34.64.172.190:9090/v1/lot/normal-create-lot',
        {
            header: 'application/json'
        }
    )
}
function* maunalLotData1(action) {
    try {
        console.log('1> request action:', action)
        const result = yield call(maunalLotData2);
        console.log('3> result:', result)
        console.log('4> result of result:', result.data)
        yield put({type:'MANUAL_LOT_UP_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'MANUAL_LOT_UP_FAILURE', e});
    }
};
function* maunalLotData() {
    yield takeLatest('MANUAL_LOT_UP', maunalLotData1);
};



export default function* loadDashboard() {
    yield all ([
        fork(lastLoadProgressStatus),
        fork(lastLoadPerformance),
        fork(autoLotData),
        fork(maunalLotData)
    ])
}