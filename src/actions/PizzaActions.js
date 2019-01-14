import { ADD_PIZZA_TO_CART, REMOVE_PIZZA_FROM_CART } from "../actions/types";

export const addPizzaToCart = pizza => {
  return {
    type: ADD_PIZZA_TO_CART,
    payload: pizza
  };
};

export const removePizzaFromCart = pizza => {
  return {
    type: REMOVE_PIZZA_FROM_CART,
    payload: pizza
  };
};
