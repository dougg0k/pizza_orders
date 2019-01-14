import { createSelector } from "reselect";

export const getPizzasInCart = createSelector(
  state => state.pizzaReducer.pizzasInCart,
  pizzasInCart => pizzasInCart
);
