import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { action1, action2 } from './actions';

function* action1Saga(action) {
    const res = yield call ([axios, 'get'], 'url', {
        params: {
            startDate: action.payload,
            endDate: action.payload 
            // 여기서 질문!!
            // 페이로드 여러개 사용 가능한지?
            // isCancel은 all일때 안 들어가는데 어케 다룰지?!
        }
    })

    if (res.data) { // api 호출 성공시
        console.log(res.data); // redux-logger 사용하면 될듯? 알아봐야함
        yield put ()
    }
}