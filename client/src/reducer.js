const initialState = {
    counter: 0
  }

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'COUNTER_PLUS': {
        return {
          ...state,
          counter: state.counter + 1
        }
      }
      case 'COUNTER_MINUS': {
        return {
          ...state,
          counter: state.counter - 1
        }
      }
      default: {
        return state;
      }
    }
  
  }
  
  export default reducer;