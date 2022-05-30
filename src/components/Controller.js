import React, { useRef, useEffect, useContext } from "react";
import classes from "./Controller.module.css";
import { FrameContext } from "../context/frame-context";
import {
  getCurrentFrameWidth,
  makeElementsBoundTo,
  getNoOfElements,
  createFrameElements,
  getRGBValue,
} from "../Logic/frameContentLogic";

export const Controller = () => {
  const inputRef = useRef();
  const {
    frameElements,
    frameRef,
    elementSize,
    setFrameElements,
    setInputRef,
    sliderValueHandler,
  } = useContext(FrameContext);
  // deep copy created to avoid state mutation because array is an object

  const deepCopyOfFrameElements = frameElements?.map((element) => ({
    ...element,
    style: { ...element.style },
  }));

  useEffect(() => {
    setInputRef(inputRef.current);
  }, [inputRef, setInputRef]);

  useEffect(() => {
    const updatedFrameElements = deepCopyOfFrameElements.map((element) => ({
      ...element,
      style: {
        ...element.style,
        width: `${Number(elementSize)}px`,
      },
    }));
    if (frameRef) {
      const FrameWidth = getCurrentFrameWidth(
        `<div></div>` && frameRef?.current
      );
      const currentNoOfElements = frameElements.length;
      const expectedNoOfElements = getNoOfElements(FrameWidth, elementSize);
      const newArray = makeElementsBoundTo(
        elementSize,
        updatedFrameElements,
        currentNoOfElements,
        expectedNoOfElements
      );
      setFrameElements(newArray);
    }
    // eslint-disable-next-line
  }, [elementSize]);

  const generateElementHandler = () => {
    const color = getRGBValue();
    const FrameWidth = getCurrentFrameWidth(frameRef.current);
    const size = getNoOfElements(FrameWidth, elementSize);
    setFrameElements(
      createFrameElements(color.red, color.green, color.blue, elementSize, size)
    );
  };

  return (
    <div className={classes["controller-container"]}>
      <div className={classes.cmc}>
        <button
          onClick={generateElementHandler}
          className={`${classes.controller} ${classes.Generate}`}
        >
          Generate
        </button>
        <input
          type="range"
          ref={inputRef}
          name="Size"
          id="Size"
          min="10"
          max="80"
          onChange={sliderValueHandler}
          defaultValue="10"
          step="5"
        />
        <label htmlFor="size">Size</label>
        <button className={`${classes.controller} ${classes.Sort}`}>
          Sort
        </button>
      </div>
    </div>
  );
};
