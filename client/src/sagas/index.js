import {takeLatest} from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import {createServerSaga} from './serverSaga';

function* rootSaga(){
    yield takeLatest(ACTION_TYPES.REQUEST_COUNTER_FETCHING, createServerSaga)
/// yield takeLatest(...ANOTHER_ACTION_TYPE, another_worker)
}

export default rootSaga;