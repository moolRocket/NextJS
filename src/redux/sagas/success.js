import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

async function successData(params) {
    console.log(`2> params: ${params}`)
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v2/bid/find-success-bid?startDate=${params.startDate}&endDate=${params.endDate}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}

function* loadSuccessData(action) {
    try {
        console.log(`1> request action: ${action}`)
        const result = yield call(successData, action.params);
        console.log(`3> result:${result}`)
        yield put({type:'LOAD_SUCCESS_DATA_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_SUCCESS_DATA_FAILURE', e});
    }
};

function* lastLoadData2() {
    yield takeLatest('LOAD_SUCCESS_DATA_REQUEST', loadSuccessData);
};


async function successDetailsData(bid_sn_one) {
    console.log("2> params:", bid_sn_one)
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v2/bid/find-bid-product/${bid_sn_one}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        } 
    });
}
function* loadSuccessDetailsData(action) {
    try{
        console.log("1>request detail action", action);
        const result = yield call(successDetailsData, action.bid_sn_one);
        console.log("3> detail result", result);
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
        fork(lastLoadSuccessDetailData)
    ]);
};