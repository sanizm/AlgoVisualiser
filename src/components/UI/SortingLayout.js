import React from "react";
import { Navbar } from "./Navbar";
import { Controller } from "../Controller";
import { Frame } from "../Frame";
import { FrameStateContext } from "../../context/frame-context";

export const SortingLayout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="body">
        <FrameStateContext>
          <Controller
            sortMethod={props.sortMethod}
            isSorting={props.isSorting}
          />
          <Frame />
        </FrameStateContext>
      </div>
    </React.Fragment>
  );
};
