import React from "react";
import { Link } from "react-router-dom";
import classes from "./MenuBar.module.css";

export const MenuBar = () => {
  return (
    <ul className={classes.products}>
      <li className={classes["sorting-menu-container"]}>
        <span
          className={` ${classes.product} ${classes["sorting-algorithms"]}`}
        >
          Sorting
        </span>
        <ul className={`${classes["product-menu"]} ${classes["sorting-menu"]}`}>
          <li>
            <Link to="/InsertionSort">
              <span
                className={`${classes["product-menu-item"]} ${classes["Insertion-sort"]}`}
              >
                InsertionSort
              </span>
            </Link>
          </li>
          <li>
            <Link to="/QuickSort">
              <span
                className={`${classes["product-menu-item"]} ${classes["Quick-sort"]}`}
              >
                QuickSort
              </span>
            </Link>
          </li>
          <li>
            <Link to="/BubbleSort">
              <span
                className={`${classes["product-menu-item"]} ${classes["Bubble-sort"]}`}
              >
                BubbleSort
              </span>
            </Link>
          </li>
          <li>
            <Link to="/MergeSort">
              <span
                className={`${classes["product-menu-item"]} ${classes["Merge-sort"]}`}
              >
                MergeSort
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li className={classes["path-finding-menu-container"]}>
        <span className={`${classes["product"]} ${classes["Path-Finding"]}`}>
          Path-Finding
        </span>
        <ul
          className={`${classes["product-menu"]} ${classes["path-finding-menu"]}`}
        >
          <li>
            <Link to="/PathFinding1">
              <span
                className={`${classes["product-menu-item"]} ${classes["path-finding1"]}`}
              >
                PathFinding1
              </span>
            </Link>
          </li>
          <li>
            <Link to="/PathFinding2">
              <span
                className={`${classes["product-menu-item"]} ${classes["path-finding2"]}`}
              >
                PathFinding2
              </span>
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/about">
          <span className={`${classes.product} ${classes.about}`}>About</span>
        </Link>
      </li>
    </ul>
  );
};
