import React, { useRef, useEffect, useContext } from "react";
import classes from "./Controller.module.css";
import { FrameContext } from "../context/frame-context";
import {
  InsertionSort,
  bubbleSort,
  QuickSort,
  InsertionSortAnimation,
  QuickSortAnimation,
} from "../Logic/InsertionSortAlgorithm";
import {
  getCurrentFrameWidth,
  makeElementsBoundTo,
  getNoOfElements,
  createFrameElements,
  getRGBValue,
} from "../Logic/frameContentLogic";

let divElements = document.getElementsByClassName("frame-element");

export const Controller = ({ sortMethod, isSorting }) => {
  const inputRef = useRef();
  const isSortingRef = useRef(isSorting);
  const {
    frameElements,
    frameRef,
    arrayRef,
    elementSize,
    setFrameElements,
    setInputRef,
    sliderValueHandler,
  } = useContext(FrameContext);

  useEffect(() => {
    setInputRef(inputRef.current);
  }, [inputRef, setInputRef]);

  useEffect(() => {
    // let divElements = arrayRef.current;
    // console.log(divElements);
    if (divElements) {
      isSortingRef.current = false;
      const elements = [];
      for (let i = 0; i < divElements.length; i++) {
        elements.push({
          id: divElements[i].id,
          key: divElements[i].dataset.key,
          style: {
            height: `${divElements[i].style.height}%`,
            width: `${Number(elementSize)}px`,
            backgroundColor: `${divElements[i].style.backgroundColor}`,
            borderColor: `${divElements[i].style.borderColor}`,
          },
        });
      }

      const updatedFrameElements = elements?.map((element) => ({
        ...element,
        style: {
          ...element.style,
          width: `${Number(elementSize)}px`,
        },
      }));

      if (frameRef) {
        const FrameWidth = getCurrentFrameWidth(frameRef?.current);
        const currentNoOfElements = arrayRef.current.length;
        const expectedNoOfElements = getNoOfElements(FrameWidth, elementSize);
        const newArray = makeElementsBoundTo(
          elementSize,
          updatedFrameElements,
          currentNoOfElements,
          expectedNoOfElements
        );
        arrayRef.current = newArray;
        setFrameElements(arrayRef.current);
      }
    }
    // eslint-disable-next-line
  }, [elementSize]);

  const generateElementHandler = () => {
    isSortingRef.current = false;

    const color = getRGBValue();
    const FrameWidth = getCurrentFrameWidth(frameRef.current);
    const size = getNoOfElements(FrameWidth, elementSize);
    arrayRef.current = createFrameElements(
      color.red,
      color.green,
      color.blue,
      elementSize,
      size
    );
    setFrameElements(arrayRef.current);
  };

  const sortingHandler = () => {
    divElements = document.getElementsByClassName("frame-element");

    const deepCopyOfFrameElements = frameElements?.map((element) => ({
      ...element,
      style: { ...element.style },
    }));
    if (sortMethod === "InsertionSort" && !isSortingRef.current) {
      console.log("InsertionSort");

      const effects = InsertionSort(deepCopyOfFrameElements);
      InsertionSortAnimation(divElements, effects, elementSize);
      isSortingRef.current = true;

      arrayRef.current = deepCopyOfFrameElements;
    } else if (sortMethod === "BubbleSort" && !isSortingRef.current) {
      const effects = bubbleSort(deepCopyOfFrameElements);
      InsertionSortAnimation(divElements, effects, elementSize);
      isSortingRef.current = true;
      arrayRef.current = deepCopyOfFrameElements;
    } else if (sortMethod === "QuickSort" && !isSortingRef.current) {
      const effects = QuickSort(deepCopyOfFrameElements);
      QuickSortAnimation(divElements, effects, elementSize);
      isSortingRef.current = true;
      arrayRef.current = deepCopyOfFrameElements;
    }
  };

  return (
    <div className={classes["controller-container"]}>
      <div className={classes.cmc}>
        <button
          id="generate"
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
          defaultValue="5"
          step="5"
        />
        <label htmlFor="size">Size</label>
        <button
          id="sort"
          onClick={sortingHandler}
          className={`${classes.controller} ${classes.Sort}`}
        >
          Sort
        </button>
      </div>
    </div>
  );
};
