import React, {useReducer} from 'react';
import {connect} from 'react-redux';
import {incrementAction, decrementAction, changeStepAction} from './actions/actionCreator';



const Counter = (props) => {
          
    // const increment = () => {
    //     props.dispatch(createActionIncrement());
    // }

    // const decrement = () => {
    //    props.dispatch(createActionDecrement());
    // }
    
    console.log(props);

    const onChangeStep = ({target: {value}}) => {
        props.changeStep(Number(value))
    }



    return (
        <>
            <h1>{props.counter}</h1>
            <input type="number" name="step" onChange={onChangeStep} value={props.step}/>
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
//         increment: () => dispatch(incrementAction()),
//         decrement: () => dispatch(decrementAction()),
//         changeStep: (value) => dispatch(changeStepAction(value))
//     }
// }


const mapDispatchToProps = {
   increment: incrementAction, 
   decrement: decrementAction,
   changeStep: changeStepAction
}

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);


export default WrappedCounter;
