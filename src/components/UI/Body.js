import React from "react";
import classes from "./Body.module.css";

export const Body = () => {
  return (
    <div className={classes.title}>
      <div className={classes["headline-text"]}>Welcome To</div>
      <div
        className={`${classes["headline-text"]} ${classes["headline-second-half"]}`}
      >
        AlgoVisualiser
      </div>
    </div>
  );
};
