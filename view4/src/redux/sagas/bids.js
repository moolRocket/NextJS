import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

const local_v2 = "http://192.168.0.251:9090/v2"
const gcp_v2 = "http://34.64.172.190:9090/v2"

// bid 페이지 조회
async function bidsData(params) {
    console.log("`2> params: ", params)
    return await axios({
        method: "GET",
        url: `${gcp_v2}/bid?startDate=${params.startDate}&endDate=${params.endDate}&bidStatus=${params.bidStatus}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}
function* loadBidsData(action) {
    try {
        console.log("1> request action: ", action)
        const result = yield call(bidsData, action.params);
        console.log("3> loadBidsData result:", result)
        yield put({type:'LOAD_BIDS_DATA_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_BIDS_DATA_FAILURE', e});
    }
};
function* lastLoadData3() {
    yield takeLatest('LOAD_BIDS_DATA_REQUEST', loadBidsData);
};

// bid detail 조회
async function bidDetailsData(bid_sn_one) {
    console.log("2 params: ", bid_sn_one);
    return await axios ({
        method: "GET",
        url: `${gcp_v2}/bid/find-bid-product/${bid_sn_one}`,
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

// 가격 바꾸기
async function priceChangeData(params) {
    console.log("2 params: ", params);
    return await axios ({
        method: "PATCH",
        url: `${gcp_v2}/bid/change-offer-price?product_sn=${params.product_sn}&price=${params.price}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
        } 
    })
}
function* loadpriceChangeData(action) {
    try {
        console.log("1>request detail action", action);
        const result = yield call(priceChangeData, action.params);
        console.log("detail result", result);
        yield put({type: 'LOAD_CHANGE_PRICE_SUCCESS', data: result.data})
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_CHANGE_PRICE_FAILURE', e});
    }
}
function* lastLoadpriceChangeData() {
    yield takeLatest('LOAD_CHANGE_PRICE_REQUEST', loadpriceChangeData);
}

// 입찰 시작
async function makeSuccessChangeData(params) {
    console.log("2 make success params: ", params);
    return await axios.patch(
        `${gcp_v2}/bid`,
        {
            "bid_sn": params.bid_sn,
            "updateStartDate": params.updateStartDate,
            "updateEndDate": params.updateEndDate
        },
        {
            header: 'Content-Type: application/json'
        } 
    );
}
function* loadmakeSuccessChangeData(action) {
    try {
        console.log("1> make success request detail action", action);
        const result = yield call(makeSuccessChangeData, action.params);
        console.log("3>  make success result", result);
        yield put({type: 'MAKE_SUCCESS_DATA_SUCCESS', data: result.data})
    } catch (e) {
        console.error(e);
        yield put({type:'MAKE_SUCCESS_DATA_FAILURE', e});
    }
}
function* lastmakeSuccessChangeData() {
    yield takeLatest('MAKE_SUCCESS_DATA_REQUEST', loadmakeSuccessChangeData);
}

export default function* loadData3() {
    yield all([
        fork(lastLoadData3),
        fork(lastLoadBidDetailData),
        fork(lastLoadpriceChangeData),
        fork(lastmakeSuccessChangeData)
    ]);
};