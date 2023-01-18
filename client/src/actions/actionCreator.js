import ACTION_TYPES from './actionTypes';

export const incrementAction = () => {
    return ({
        type: ACTION_TYPES.INCREMENT
    })
}

export const decrementAction = () => {
    return ({
        type: ACTION_TYPES.DECREMENT
    })
}



////  (value) => {type:..., value}


export const changeStepAction = (value) => {
    return ({
        type: ACTION_TYPES.STEP_CHANGE,
        value
    })
}


//////Requests


export const requestCounterFetching = (serverData) => {
    return ({
        type: ACTION_TYPES.REQUEST_COUNTER_FETCHING,
        serverData
    })
}

export const requestCounterSuccess = (data) => {
    return ({
        type: ACTION_TYPES.REQUEST_COUNTER_SUCCESS,
        data
    })
}

export const requestCounterError = (error) => {
    return ({
        type: ACTION_TYPES.REQUEST_COUNTER_ERROR,
        error
    })
}