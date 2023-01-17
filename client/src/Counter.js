import React, {useReducer} from 'react';
import {connect} from 'react-redux';
import {incrementAction, decrementAction} from './actions/actionCreator';



const Counter = (props) => {
          
    // const increment = () => {
    //     props.dispatch(createActionIncrement());
    // }

    // const decrement = () => {
    //    props.dispatch(createActionDecrement());
    // }
    
    console.log(props);
    return (
        <>
            <h1>{props.counter}</h1>
             <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button>
        </>
    )
}

/*
Connect - це функція, що приймає два аргументи (обидва опціональні) і підписує компоненту на оновлення стейту
- mapStateToProps - фунція, що приймає ВЕСЬ стейт (стан додатку) і повертає тільки ту частину стейта, яка потрібна ЦІЙ компоненті
- mapDispatchToProps - функція, яка повертає об'єкт, наповнений огорнутими диспатчем actionCreator-ами.


*/

const mapStateToProps = (state) => {
    return state
}


// const mapDispatchToProps = (dispatch) => {
//     return {
//         increment: () => dispatch(createActionIncrement()),
//         decrement: () => dispatch(createActionDecrement())
//     }
// }


const mapDispatchToProps = {
   increment: incrementAction, 
   decrement: decrementAction
}

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);


export default WrappedCounter;
