import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345,
    minWidth: 200,
    marginTop: 10
  },
  media: {
    height: 160,
    backgroundColor: "#FEF3E8",
    backgroundSize: "auto"
  },
  actionsContainer: {
    justifyContent: "space-between"
  },
  price: {
    marginRight: 20,
    fontWeight: 500
  },
  pizzaSize: {
    position: "absolute",
    color: "#f50057",
    marginLeft: 10,
    marginTop: 10
  }
};

const PizzaListItem = props => {
  const { classes, item, price, handleToppings, addToCartButton } = props;

  return (
    <Card className={classes.card}>
      <Typography className={classes.pizzaSize}>{item.name}</Typography>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/img/${item.name}_pizza_size.png`}
        title={`${item.name} size pizza`}
      />
      <CardContent>
        {item.toppings.map(itemTopp => {
          return (
            <FormControlLabel
              key={itemTopp.topping.name}
              control={
                <Checkbox
                  checked={itemTopp.selected}
                  disabled={itemTopp.disabled}
                  value={itemTopp.topping.name}
                  onChange={(event, checked) =>
                    handleToppings(itemTopp.topping, item, checked)
                  }
                />
              }
              label={itemTopp.topping.name}
            />
          );
        })}
      </CardContent>
      <CardActions className={classes.actionsContainer} onClick={addToCartButton}>
        <Button size="small" color="secondary">
          Add to Cart
        </Button>
        <Typography component="p" className={classes.price}>
          ${price.toFixed(2) || 0}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(PizzaListItem);
