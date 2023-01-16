import React, {useReducer} from 'react';
import {connect} from 'react-redux';

const Counter = (props) => {
          
    
    const increment = () => {
        const action = {
            type: 'COUNTER_PLUS'
        }
       props.dispatch(action);
    }

    const decrement = () => {
        const action = {
            type: 'COUNTER_MINUS'
        }
       props.dispatch(action);
    }
    
    console.log(props);
    return (
        <>
            <h1>{props.counter}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )
}

/*
Connect - це функція, що приймає два аргументи (обидва опціональні) і підписує компоненту на оновлення стейту
- mapStateToProps - фунція, що приймає ВЕСЬ стейт (стан додатку) і повертає тільки ту частину стейта, яка потрібна ЦІЙ компоненті
- mapDispatchToProps

*/

const mapStateToProps = (state) => {
    return state
}

const WrappedCounter = connect(mapStateToProps)(Counter);


export default WrappedCounter;
