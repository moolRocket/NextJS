// // 액션
// {
//     type: 'ADD_TODO',
//     data: {
//         id: 1,
//         text: 'learn redux'
//     }
// }

// {
//     type: 'CHANGE_INPUT',
//     text: 'Hello'
// }

// // 액션 생성 함수
// function addTodo(data) {
//     return {
//         type: 'ADD_TODO',
//         data
//     };
// }

// const changeInput = text => ({
//     type: 'CHANGE_INPUT',
//     text
// })

// // 리듀서: 변화를 일으키는 함수
// const initialState1 = { counter: 1 };
// function reducer (state=initialState, action) {
//     switch (action.type) {
//         case INCREMENT:
//             return {
//                 counter: state.counter +1
//             };
//         default:
//             return state;
//     }
// }

// // 스토어 (state, reducer, dispatch, subscribe)

// const btnIncrese = document.querySelector('#increse');

// // 액션 이름 정의
// const INCREASE = 'INCREASE';

// // 액션 생성 함수
// const increase = difference => ({ type: INCREASE, difference});

// // 초깃값 설정
// const initialState = { toggle: false, counter: 0 };

// // 리듀서
// function reducer ( state=initialState, action) {
//     switch (action.type) {
//         case INCREASE:
//             return {
//                 ...state, 
//                 counter: state.counter + state.difference
//             };
//         default:
//             return state;
//     }
// }

// // 스토어 만들기
// import { createStore } from 'redux';

// const store = createStore(reducer);

// // render 함수 만들기

// const render = () => {
//     const state = store.getState();
//     if (state.toggle) {
//         divToggle.classList.add('active');
//     }
// }


// // 구독하기
// const listener = () => {
//     console.log('update')
// }
// const unsubscribe = store.subscribe(listener);

// unsubscribe();