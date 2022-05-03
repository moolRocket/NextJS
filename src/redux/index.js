// 루트 리듀서

import { combineReducers } from 'redux';
import ducksPattern from './ducksPattern';

const rootReducer = combineReducers({ ducksPattern });

export default rootReducer;