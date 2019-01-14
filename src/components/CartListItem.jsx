import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const CartListItem = props => {
  const { pizzaSize, toppings, onClick, itemPrice } = props;
  return (
    <ListItem
      divider
      style={{
        borderWidth: 1,
        borderColor: "#f50057",
        borderStyle: "solid",
        marginBottom: 1
      }}
    >
      <ListItemText
        primary={
          <Typography
            type="body2"
            style={{ color: "#f50057", fontWeight: 500 }}
          >
            {pizzaSize} pizza
          </Typography>
        }
        secondary={
          <Typography type="body2" style={{ color: "#2196f3" }}>
            {toppings}
          </Typography>
        }
      />
      <Typography type="body2" style={{ fontWeight: 500, marginRight: 15 }}>
        {itemPrice.toFixed(2)}
      </Typography>
      <Button variant="contained" color="secondary" onClick={onClick}>
        Remove
      </Button>
    </ListItem>
  );
};

export default CartListItem;
