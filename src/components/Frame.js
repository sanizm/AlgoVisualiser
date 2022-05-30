import React, { useRef, useEffect, useContext } from "react";
import classes from "./Frame.module.css";
import {
  getCurrentFrameWidth,
  getNoOfElements,
  getRGBValue,
  createFrameElements,
  // makeElementsBoundTo,
} from "../Logic/frameContentLogic";
import { FrameContext } from "../context/frame-context";

export const Frame = () => {
  const frameRef = useRef();

  const { frameElements, setFrameRef, elementSize, setFrameElements } =
    useContext(FrameContext);

  useEffect(() => {
    setFrameRef(frameRef);
    const FrameWidth = getCurrentFrameWidth(frameRef.current);
    const size = getNoOfElements(FrameWidth, elementSize);
    let color = getRGBValue();
    setFrameElements(
      createFrameElements(color.red, color.green, color.blue, elementSize, size)
    );

    // eslint-disable-next-line
  }, []);

  return (
    <div ref={frameRef} className={classes.frame}>
      {frameElements?.map((element) => (
        <div
          className={classes["frame-element"]}
          id={element.id}
          key={element.key}
          style={element.style}
        ></div>
      ))}
    </div>
  );
};
