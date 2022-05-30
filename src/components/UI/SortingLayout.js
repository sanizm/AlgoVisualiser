import React from "react";
import { Navbar } from "./Navbar";
import { Controller } from "../Controller";
import { Frame } from "../Frame";
import { FrameStateContext } from "../../context/frame-context";

export const SortingLayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="body">
        <FrameStateContext>
          <Controller />
          <Frame />
        </FrameStateContext>
      </div>
    </React.Fragment>
  );
};
