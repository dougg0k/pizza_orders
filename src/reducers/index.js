import { combineReducers } from "redux";

import PizzaReducer from "./PizzaReducer";

export default combineReducers({
  pizzaReducer: PizzaReducer
});
