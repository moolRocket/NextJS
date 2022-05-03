import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

async function bidsData(params) {
    console.log(`2> params: ${params}`)
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v2/bid?startDate=${params.startDate}&endDate=${params.endDate}&bidStatus=${params.bidStatus}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}

function* loadBidsData(action) {
    try {
        console.log(`1> request action: ${action}`)
        const result = yield call(bidsData, action.params);
        console.log(`3> result:${result}`)
        yield put({type:'LOAD_BIDS_DATA_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_BIDS_DATA_FAILURE', e});
    }
};

function* lastLoadData3() {
    yield takeLatest('LOAD_BIDS_DATA_REQUEST', loadBidsData);
};

async function bidDetailsData(bid_sn_one) {
    console.log("2 params: ", bid_sn_one);
    return await axios ({
        method: "GET",
        url: `http://34.64.172.190:9090/v2/bid/find-bid-product/${bid_sn_one}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        } 
    })
}

function* loadBidDetailsData(action) {
    try {
        console.log("1>request detail action", action);
        const result = yield call(bidDetailsData, action.bid_sn_one);
        console.log("detail result", result);
        yield put({type: 'LOAD_BIDS_DETAIL_SUCCESS', data: result.data})
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_BIDS_DETAIL_FAILURE', e});
    }
}

function* lastLoadBidDetailData() {
    yield takeLatest('LOAD_BIDS_DETAIL_REQUEST', loadBidDetailsData);

}


export default function* loadData3() {
    yield all([
        fork(lastLoadData3),
        fork(lastLoadBidDetailData)
    ]);
};