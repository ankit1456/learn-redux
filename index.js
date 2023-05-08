import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

const history = [];

const INCREMENT = "INCREMENT";
const INCREMENT_BONUS = "INCREMENT_BONUS";
const DECREMENT = "DECREMENT";
const INCREMENT_BY_AMOUNT = "INCREMENT_BY_AMOUNT";
const INIT = "INIT";

// REDUCER
const accountReducer = (state = { amount: 1 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        amount: state.amount + 1,
      };
    case DECREMENT:
      return {
        amount: state.amount - 1,
      };
    case INCREMENT_BY_AMOUNT:
      return {
        amount: state.amount + action.payload,
      };
    case INIT:
      return {
        amount: action.payload,
      };
    default:
      return state;
  }
};

const bonusReducer = (state = { points: 0 }, action) => {
  switch (action.type) {
    case INCREMENT_BY_AMOUNT:
      return action.payload >= 100 ? { points: state.points + 1 } : state;
    
    case INCREMENT_BONUS:
      return {points:state.points + 1}

    default:
      return state;
  }
};

//ROOT REDUCER
const rootReducer = combineReducers({
  account: accountReducer,
  bonus: bonusReducer,
});

// STORE
const store = createStore(
  rootReducer,
  applyMiddleware(logger.default, thunk.default)
);

// store.subscribe(() => {
//   history.push(store.getState())
//   console.log(history)
// });

// ASYNC

// ACTIONS
const increment = () => {
  return { type: INCREMENT };
};
const incrementBonus = () => {
  return { type: INCREMENT_BONUS };
};
const decrement = () => {
  return { type: DECREMENT };
};
const incrementByAmout = (amount) => {
  return { type: INCREMENT_BY_AMOUNT, payload: amount };
};

const getUserAccount = (id) => async (dispatch, getState) => {
  const { data } = await axios(`http://localhost:3000/accounts/${id}`);
  dispatch({ type: INIT, payload: data.amount });
};
// setInterval(() => {
// }, 5000);
store.dispatch(incrementBonus());
