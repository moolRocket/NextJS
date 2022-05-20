import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

const local_v2 = "http://192.168.0.251:9090/v2"
const gcp_v2 = "http://34.64.172.190:9090/v2"

async function successData(params) {
    return await axios({
        method: "GET",
        url: `${gcp_v2}/bid/find-success-bid?startDate=${params.startDate}&endDate=${params.endDate}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}

function* loadSuccessData(action) {
    try {
        const result = yield call(successData, action.params);
        yield put({type:'LOAD_SUCCESS_DATA_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_SUCCESS_DATA_FAILURE', e});
    }
};

function* lastLoadData2() {
    yield takeLatest('LOAD_SUCCESS_DATA_REQUEST', loadSuccessData);
};

async function BiddingData(params) {
    return await axios({
        method: "GET",
        url: `${gcp_v2}/bid/find-progress-bid?startDate=${params.startDate}&endDate=${params.endDate}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}

function* loadBiddingData(action) {
    try {
        const result = yield call(BiddingData, action.params);
        yield put({type:'LOAD_BIDDING_DATA_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_BIDDING_DATA_FAILURE', e});
    }
};

function* loadBiddingData2() {
    yield takeLatest('LOAD_BIDDING_DATA_REQUEST', loadBiddingData);
};

async function successDetailsData(bid_sn_one) {
    return await axios({
        method: "GET",
        url: `${gcp_v2}/bid/find-bid-product/${bid_sn_one}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        } 
    });
}
function* loadSuccessDetailsData(action) {
    try{
        const result = yield call(successDetailsData, action.bid_sn_one);
        yield put({type: 'LOAD_SUCCESS_DETAIL_SUCCESS', data: result.data})
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_SUCCESS_DETAIL_FAILURE', e});
    }
}
function* lastLoadSuccessDetailData() {
    yield takeLatest('LOAD_SUCCESS_DETAIL_REQUEST', loadSuccessDetailsData);
}

export default function* loadData2() {
    yield all([
        fork(lastLoadData2),
        fork(lastLoadSuccessDetailData),
        fork(loadBiddingData2)
    ]);
};