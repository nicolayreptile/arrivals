import React from "react";
import classes from "./Order.module.css";

export default (props) => {
  return (
    <div className={classes.order}>
      <h1>{props.Number}</h1>
    </div>
  );
};
