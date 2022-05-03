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
        console.log("3> result: ", result)
        yield put({type:'LOAD_PRODUCTS_DATA_SUCCESS', data:result.data});
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_PRODUCTS_DATA_FAILURE', e});
    }
};
function* lastLoadData() {
    yield takeLatest('LOAD_PRODUCTS_DATA_REQUEST', loadProductsData);
};

async function makeLots(product_sn) {
    console.log("2> makeLots product_sn", {"product_list": product_sn});
    return await axios.post(
        `${gcp_v1}/lot`,
        {"product_list": product_sn},
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
        const result = yield call(makeLots, action.product_sn);
        console.log("3> makeLots result", result);
        // yield call(lastLoadData)
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_PRODUCTS_DATA_FAILURE', e});
    }
}
function* lastMakeLotsData() {
    yield takeLatest('MAKE_LOT', makeLotsData)
}

async function makeAutoLot() {
    console.log("2> make auto lot saga");
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
        console.log("1> make autolot", action);
        const result = yield call(makeAutoLot);
        console.log("2> autolot result", result);
        // yield call(lastMakeAutoLot);
    } catch (e) {
        console.error(e);
        yield put ({type:'LOAD_PRODUCTS_DATA_FAILURE', e});
    }
}
function* lastMakeAutoLotData() {
    yield takeLatest('MAKE_AUTO_LOT', makeAutoLotData);
}

export default function* loadData() {
    yield all([
        fork(lastLoadData),
        fork(lastMakeLotsData),
        fork(lastMakeAutoLotData)
    ]);
};