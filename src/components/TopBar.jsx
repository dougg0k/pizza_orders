import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    marginRight: 10
  }
};

const TopBar = props => {
  const { classes, leftText, itemAmount, buttonText, buttonLocation } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {leftText}
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to={buttonLocation}
          className={classes.button}
        >
          {buttonText}
        </Button>
        {itemAmount >= 0 && (
          <Typography color="inherit">{itemAmount} pizzas</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TopBar);
