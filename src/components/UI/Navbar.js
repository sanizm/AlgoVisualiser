import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import styled from "styled-components";
import { MenuBar } from "../menubar/MenuBar";

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: var(--mg-100);
  font-size: var(--fs-225);
`;

export const Navbar = () => {
  return (
    <header>
      <div className={classes["main-navbar"]}>
        <StyledLink to="/">
          <img
            src={require("../../Assets/logo.png")}
            alt="logo"
            className={classes.logo}
          />
          <div>AlgoVisualiser</div>
        </StyledLink>
        <MenuBar />
      </div>
    </header>
  );
};
