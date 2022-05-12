import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

const local_v1 = "http://192.168.0.251:9090/v1"
const gcp_v1 = "http://34.64.172.190:9090/v1"

async function lotsData(params) {
    return await axios({
        method: "GET",
        url: `${gcp_v1}/lot?startDate=${params.startDate}&endDate=${params.endDate}&iscancel=0`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}
function* loadLotsData(action) {
    try {
        const result = yield call(lotsData, action.params);
        // const result2 = yield call(lotsTimeData);
        yield put({type:'LOAD_LOTS_DATA_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_LOTS_DATA_FAILURE', e});
    }
};
function* lastLoadData() {
    yield takeLatest('LOAD_LOTS_DATA_REQUEST', loadLotsData);
};

async function lotDetailsData(lot_sn_one) {
    return await axios({
        method: "GET",
        url: `${gcp_v1}/lot/dtl?lot_sn=${lot_sn_one}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        } 
    });
}
function* loadLotDetailsData(action) {
    try{
        const result = yield call(lotDetailsData, action.lot_sn_one);
        yield put({type: 'LOAD_LOTS_DETAIL_SUCCESS', data: result.data})
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_LOTS_DETAIL_FAILURE', e});
    }
}
function* lastLoadDetailData() {
    yield takeLatest('LOAD_LOTS_DETAIL_REQUEST', loadLotDetailsData);
}

export default function* loadData() {
    yield all([
        fork(lastLoadData),
        fork(lastLoadDetailData)
    ]);
};

