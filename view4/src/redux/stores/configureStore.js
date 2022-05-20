import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga"; // redux-saga를 생성하기 위한 라이브러리
import rootSaga from '../sagas'; // sagas의 index.js를 가지고온다.
import { createWrapper } from "next-redux-wrapper";

// compose ?
// options : 

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' ?
        compose(applyMiddleware(...middlewares)) :
            composeWithDevTools(
                applyMiddleware(...middlewares)
            );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    // store에 rootSaga를 넣은 sagaMiddleware를 실행시켜준다.
    return store;
}

// next js는 유저가 페이지를 요청할때마다 리덕스 스토어 생성함
const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development'
});

export default wrapper;