import React from "react";
import classes from "./Column.module.css";
import Order from "../Order/Order";

export default (props) => {
  const cls = [classes.header];
  props.status === "cooking"
    ? cls.push(classes.cooking)
    : cls.push(classes.cooked);
  return (
    <div className={classes.column}>
      <div className={cls.join(" ")}>
        <h1>{props.title}</h1>
      </div>
      <div className={classes.orders}>
        {props.orders.map((order, key) => (
          <Order key={key} Number={order.Number} />
        ))}
      </div>
    </div>
  );
};
