import React, { useState, useRef } from "react";
export const FrameContext = React.createContext();

export const FrameStateContext = ({ children }) => {
  const [inputRef, setInputRef] = useState();
  const [frameRef, setFrameRef] = useState();
  const [frameElements, setFrameElements] = useState([]);
  const [elementSize, setElementSize] = useState("10");
  const arrayRef = useRef();

  const sliderValueHandler = () => {
    setElementSize(inputRef.value);
  };

  return (
    <FrameContext.Provider
      value={{
        elementSize,
        arrayRef,
        inputRef,
        setInputRef,
        frameRef,
        setFrameRef,
        frameElements,
        setFrameElements,
        sliderValueHandler,
      }}
    >
      {children}
    </FrameContext.Provider>
  );
};
