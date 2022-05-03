import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

async function productsData(params) {
    console.log(`2> params: ${params}`)
    return await axios({
        method: "GET",
        url: `http://34.64.172.190:9090/v1/product?startDate=${params.startDate}&endDate=${params.endDate}&iscancel=${params.iscancel}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        } 
    });
}
function* loadProductsData(action) {
    try {
        console.log(`1> request action: ${action}`)
        const result = yield call(productsData, action.params);
        console.log(`3> result:${result}`)
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
    console.log("makeLots product_sn", {"product_list": product_sn});
    return await axios.post(
        'http://34.64.172.190:9090/v1/lot',
        {"product_list": product_sn},
        {
            header:'application/json'
        } 
    );
};
function* makeLotsData(action) {
    try {
        console.log("makeLotsData", action);
        const result = yield call(makeLots, action.product_sn);
        console.log("makeLots result", result);
        yield call(lastLoadData)
    } catch (e) {
        console.error(e);
        yield put({type:'LOAD_PRODUCTS_DATA_FAILURE', e});
    }
}
function* lastMakeLotsData() {
    yield takeLatest('MAKE_LOT', makeLotsData)
}

export default function* loadData() {
    yield all([
        fork(lastLoadData),
        fork(lastMakeLotsData)
    ]);
};