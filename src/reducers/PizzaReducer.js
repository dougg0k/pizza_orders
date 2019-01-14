import { ADD_PIZZA_TO_CART, REMOVE_PIZZA_FROM_CART } from "../actions/types";

const INITIAL_STATE = {
  pizzasInCart: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PIZZA_TO_CART:
      return {
        ...state,
        pizzasInCart: [
          ...state.pizzasInCart,
          {
            ...action.payload,
            toppings: action.payload.toppings.map(item => ({ ...item }))
          }
        ]
      };
    case REMOVE_PIZZA_FROM_CART:
      return {
        ...state,
        pizzasInCart: state.pizzasInCart.filter(item => item !== action.payload)
      };
    default:
      return state;
  }
};
