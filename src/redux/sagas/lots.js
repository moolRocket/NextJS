import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

async function lotsData(params) {
    console.log(`2> params: ${params}`)
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v1/lot?startDate=${params.startDate}&endDate=${params.endDate}&iscancel=${params.iscancel}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}
function* loadLotsData(action) {
    try {
        console.log(`1> request action: ${action}`)
        const result = yield call(lotsData, action.params);
        console.log(`3> result:${result}`)
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
    console.log("2> params:", lot_sn_one)
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v1/lot/dtl?lot_sn=${lot_sn_one}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        } 
    });
}
function* loadLotDetailsData(action) {
    try{
        console.log("1>request detail action", action);
        const result = yield call(lotDetailsData, action.lot_sn_one);
        console.log("detail result", result);
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

