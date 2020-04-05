import React from "react";
import classes from "./Advertising.module.css";
import banner from "../../giphy.gif";

export default () => (
  <div className={classes.advertising}>
    <div className={classes.banner}>
      <img src={banner}></img>
    </div>
  </div>
);
