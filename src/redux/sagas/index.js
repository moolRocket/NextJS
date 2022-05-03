import { all, call } from 'redux-saga/effects';
import success from './success';
import products from './products';
import lots from './lots';
import bids from './bids';

export default function* rootSaga() {
    // 취소프로세스 있을경우 all X 
    // 여기를 바꿔야 한다
    yield all([
        call(success),
        call(products),
        call(lots),
        call(bids)
    ])
}