import * as React from "react";
import { gql } from "apollo-boost";
import { Query, graphql } from "react-apollo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PizzaListItem from "../components/PizzaListItem";
import TopBar from "../components/TopBar";
import { addPizzaToCart } from "../actions";
import { getPizzasInCart } from "../selectors/PIzzasSelectors";

const GET_ALL_PIZZA_SIZES = gql`
  {
    pizzaSizes {
      name
      maxToppings
      basePrice
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
    }
  }
`;

const pizzaContainer = {
  display: "flex",
  justifyContent: "space-evenly",
  flexFlow: "row wrap",
  marginTop: 30
};

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  height: "98vh",
  alignItems: "center"
};

// New variables - selected, itemTotalPrice, toppAmount, disabled
class PizzaListing extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      pizzaSizes: []
    };
  }

  componentDidMount() {
    if (this.props.data && this.props.data.pizzaSizes) {
      this.setState({
        pizzaSizes: this.addInitialToppingsHandlingProperties(
          this.props.data.pizzaSizes
        )
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.pizzaSizes !== prevProps.data.pizzaSizes) {
      this.setState({
        pizzaSizes: this.addInitialToppingsHandlingProperties(
          this.props.data.pizzaSizes
        )
      });
    }
  }

  handleToppings = (toppingSelected, item, checked) => {
    const checkedItems = this.state.pizzaSizes.map(itemSize => {
      if (item === itemSize) {
        const newToppings = itemSize.toppings.map(itemTopp => {
          if (itemTopp.topping === toppingSelected) {
            itemTopp.selected = checked;
            if (itemTopp.selected) {
              itemSize.itemTotalPrice += itemTopp.topping.price;
              itemSize.toppAmount += 1;
            } else {
              itemSize.itemTotalPrice -= itemTopp.topping.price;
              itemSize.toppAmount -= 1;
            }
          }
          return itemTopp;
        });
        this.handleSelectionBasedOnToppAmount(itemSize, newToppings, checked);
      }
      return itemSize;
    });
    this.setState({ pizzaSizes: checkedItems });
  };

  handleSelectionBasedOnToppAmount = (itemSize, newToppings, checked) => {
    if (
      itemSize.maxToppings &&
      itemSize.toppAmount >= itemSize.maxToppings &&
      checked
    ) {
      itemSize.toppings = this.disableNonSelectedToppingCheckboxes(newToppings);
    } else {
      itemSize.toppings = this.enableAllToppingCheckboxes(newToppings);
    }
  };

  disableNonSelectedToppingCheckboxes = toppings => {
    return toppings.map(itemTopp => {
      if (!itemTopp.selected) {
        itemTopp.disabled = true;
      }
      return itemTopp;
    });
  };

  enableAllToppingCheckboxes = toppings => {
    return toppings.map(itemTopp => {
      itemTopp.disabled = false;
      return itemTopp;
    });
  };

  addInitialToppingsHandlingProperties = pizzaSizes => {
    let toppAmount = 0;
    return pizzaSizes.map(itemSize => {
      itemSize.itemTotalPrice = itemSize.basePrice;
      const newItems = itemSize.toppings.map(itemTopp => {
        itemTopp.disabled = false;
        itemTopp.selected = itemTopp.defaultSelected;
        if (itemTopp.defaultSelected) {
          toppAmount += 1;
          itemSize.itemTotalPrice += itemTopp.topping.price;
        }
        itemSize.toppAmount = toppAmount;
        return itemTopp;
      });
      itemSize.toppings = newItems;
      toppAmount = 0;
      return itemSize;
    });
  };

  addToCart = item => this.props.actions.addPizzaToCart(item);

  render() {
    const { pizzaSizes } = this.state;
    const { pizzasInCart } = this.props;
    return (
      <Query query={GET_ALL_PIZZA_SIZES}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div style={loadingContainer}>Loading Pizzas...</div>;
          }
          if (error) {
            return <div>Error :(</div>;
          }

          return (
            <div>
              <TopBar
                leftText="Pizzas Listing"
                buttonLocation="/cart"
                buttonText="Cart"
                itemAmount={pizzasInCart.length}
              />
              <div style={pizzaContainer}>
                {pizzaSizes.map(item => {
                  return (
                    <PizzaListItem
                      key={item.name}
                      item={item}
                      price={item.itemTotalPrice}
                      handleToppings={this.handleToppings}
                      addToCartButton={() => this.addToCart(item)}
                    />
                  );
                })}
              </div>
            </div>
          );
        }}
      </Query>
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
        addPizzaToCart
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(GET_ALL_PIZZA_SIZES)(PizzaListing));
