//액션 타입, 액션 생성함수, 초깃값 리듀서를 한 파일에 작성

/*
    state 는 modified Data,
    ==> at our prj, state means dateprops
*/

// 함수. 데이터를 넣어주는 저장소의 역할
import { createStore } from "redux";

const state = 0;

const reducer = (state, action) => {
    if(action.type==="ADD") {
        return state + 1;
    } else return state;
};

// this store has 4 function [dispatch, subscribe, getState, replaceReducer]
const store = createStore(reducer);

// const onChange() => {
//     console.log("changed");
// }


store.subscribe(onChange); 

store.dispatch({type: "ADD"})
