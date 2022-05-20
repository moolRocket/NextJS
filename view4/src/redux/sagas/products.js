import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

const local_v1 = "http://192.168.0.251:9090/v1"
const gcp_v1 = "http://34.64.172.190:9090/v1"

async function productsData(params) {
    console.log("2> params: ", params)
    return await axios.get(
        `${gcp_v1}/product?startDate=${params.startDate}&endDate=${params.endDate}`,
        {
            header: 'accept: */*'
        }
    );
}
function* loadProductsData(action) {
    try {
        console.log("1> request LOAD action: ", action)
        const result = yield call(productsData, action.params);
        console.log("3> product load result: ", result)
        yield put({type:'LOAD_PRODUCTS_DATA_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_PRODUCTS_DATA_FAILURE', e});
    }
};
function* lastLoadData() {
    yield takeLatest('LOAD_PRODUCTS_DATA_REQUEST', loadProductsData);
};

async function makeLots(products_sn) {
    console.log("2> makeLots products_sn", {"product_list": products_sn});
    return await axios.post(
        `${gcp_v1}/lot`,
        {"product_list": products_sn},
        {
            headers: {
                'Content-Type':'application/json',
                'accept' : '*/*'
            }
        }
    );
};
function* makeLotsData(action) {
    try {
        console.log("1> makeLotsData", action);
        const result = yield call(makeLots, action.products_sn);
        console.log("3> makeLots result", result);
        yield put({type:'MAKE_LOT_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'MAKE_LOT_FAILURE', e});
    }
}
function* lastMakeLotsData() {
    yield takeLatest('MAKE_LOT_REQUEST', makeLotsData)
}

async function makeAutoLot() {
    return await axios.post (
        `${gcp_v1}/lot/auto-create-lot`,
        {
            headers: {
                'Content-Type':'application/json',
                'accept' : '*/*'
            }
        }
    );
}
function* makeAutoLotData(action) {
    try {
        const result = yield call(makeAutoLot);
        yield put({type:'MAKE_AUTO_LOT_SUCCESS'});
    } catch (e) {
        console.error(e);
        yield put ({type:'LOAD_PRODUCTS_DATA_FAILURE', e});
    }
}
function* lastMakeAutoLotData() {
    yield takeLatest('MAKE_AUTO_LOT_REQUEST', makeAutoLotData);
}

export default function* loadData() {
    yield all([
        fork(lastLoadData),
        fork(lastMakeLotsData),
        fork(lastMakeAutoLotData)
    ]);
};