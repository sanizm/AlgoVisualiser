import { v4 as uuidv4 } from "uuid";
export let current_RGB;

export function getCurrentFrameWidth(frame) {
  return (
    frame?.offsetWidth -
    parseFloat(getComputedStyle(frame)?.paddingLeft) * 2 -
    2
  );
}

export function getNoOfElements(FrameWidth, elementSize) {
  const elementWidth = Number(elementSize);
  const modulo = FrameWidth % elementWidth;
  return (FrameWidth - modulo) / elementWidth;
}

export function getRGBValue() {
  current_RGB = {
    red: generateRGBValue(),
    green: generateRGBValue(),
    blue: generateRGBValue(),
  };
  return current_RGB;
}

export function createFrameElements(red, green, blue, elementSize, size) {
  const properties = [];
  for (let i = 0; i < size; i++) {
    const randomHeight = getRandomHeight();
    const key = uuidv4();
    properties[i] = {
      id: `${randomHeight}`,
      key,
      style: {
        height: `${randomHeight}%`,
        backgroundColor: `rgb(${red},${green},${blue})`,
        width: `${Number(elementSize)}px`,
        borderColor: `rgb(${255 - red},${255 - green},${255 - blue})`,
      },
    };
  }
  return properties;
}

export function makeElementsBoundTo(
  elementSize,
  updatedFrameElements,
  currentNoOfElements,
  expectedNoOfElements
) {
  if (currentNoOfElements > expectedNoOfElements) {
    const NoOfElementsToRemove = currentNoOfElements - expectedNoOfElements;
    return removeElements(updatedFrameElements, NoOfElementsToRemove);
  } else if (currentNoOfElements < expectedNoOfElements) {
    const NoOfElementsToAdd = expectedNoOfElements - currentNoOfElements;
    return addElements(updatedFrameElements, elementSize, NoOfElementsToAdd);
  } else {
    return updatedFrameElements;
  }
}

export function getPropertiesFromLiveFrameElements(array, elementSize) {
  const elements = [];
  for (let i = 0; i < array.length; i++) {
    elements.push({
      id: array[i].dataset.id,
      key: array[i].dataset.key,
      style: {
        height: `${array[i].style.height}%`,
        backgroundColor: `${array[i].style.backgroundColor}`,
        width: `${Number(elementSize)}px`,
        borderColor: `${array[i].style.borderColor}`,
      },
    });
  }
  return elements;
}

export function generateRGBValue() {
  return Math.floor(Math.random() * 255) + 0;
}

// Helper functions

function getRandomHeight() {
  // Math.floor( Math.random() * (98 - 5 + 1) + 5);
  return Math.random() * (98 - 5 + 1) + 5; // (max - min + 1)
}

function removeElements(elements, NoOfElementsToRemove) {
  for (let i = 0; i < NoOfElementsToRemove; i++) {
    elements.pop();
  }
  return elements;
}

function addElements(elements, elementSize, NoOfElementsToAdd) {
  return appendNewElements(
    current_RGB.red,
    current_RGB.green,
    current_RGB.blue,
    elementSize,
    NoOfElementsToAdd,
    elements
  );
}

function appendNewElements(red, green, blue, elementSize, size, properties) {
  for (let i = 0; i < size; i++) {
    const randomHeight = getRandomHeight();
    const key = uuidv4();
    properties.push({
      id: `${randomHeight}`,
      key,
      style: {
        height: `${randomHeight}%`,
        backgroundColor: `rgb(${red},${green},${blue})`,
        width: `${Number(elementSize)}px`,
        borderColor: `rgb(${255 - red},${255 - green},${255 - blue})`,
      },
    });
  }
  return properties;
}
