import * as React from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import CartListItem from "../components/CartListItem";
import TopBar from "../components/TopBar";
import { removePizzaFromCart } from "../actions";
import { Typography } from "@material-ui/core";
import { getPizzasInCart } from "../selectors/PIzzasSelectors";

const styles = theme => ({
  root: {
    width: "45%",
    alignSelf: "center"
  }
});

const listContainer = {
  marginTop: 30,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  color: "#2196f3"
};

const totalStyle = {
  marginTop: 10,
  right: 15,
  position: "absolute",
  fontWeight: 500
};

const emptyCartStyle = {
  display: "flex",
  justifyContent: "center",
  fontWeight: 500,
  fontSize: 18
};

class CartListing extends React.PureComponent {
  removeItem = item => this.props.actions.removePizzaFromCart(item);

  turnItemToppingsIntoStr = item => {
    return item.toppings
      .filter(obj => obj.selected)
      .map(obj2 => obj2.topping.name)
      .join(", ");
  };

  getItemsTotalCost = () => {
    if (this.props.pizzasInCart.length === 1) {
      return this.props.pizzasInCart[0].itemTotalPrice.toFixed(2);
    }
    return this.props.pizzasInCart
      .reduce((acc, curr) => acc + curr.itemTotalPrice, 0)
      .toFixed(2);
  };

  render() {
    const { classes, pizzasInCart } = this.props;
    return (
      <div>
        <TopBar leftText="Cart" buttonLocation="/" buttonText="Go Back" />
        <div style={listContainer}>
          <List className={classes.root}>
            {pizzasInCart.map(item => (
              <CartListItem
                key={Math.random()}
                pizzaSize={item.name}
                toppings={this.turnItemToppingsIntoStr(item)}
                onClick={() => this.removeItem(item)}
                itemPrice={item.itemTotalPrice}
              />
            ))}
            {pizzasInCart.length ? (
              <Typography style={totalStyle}>
                Total: ${this.getItemsTotalCost()}
              </Typography>
            ) : (
              <div style={emptyCartStyle}>Empty Cart</div>
            )}
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pizzasInCart: getPizzasInCart(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        removePizzaFromCart
      },
      dispatch
    )
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartListing)
);
