import { current_RGB } from "./frameContentLogic";

export function InsertionSort(array) {
  const effects = [];
  for (let i = 1; i < array.length; i++) {
    let j = i;
    const swappedElements = [];
    while (j > 0 && +array[j].id < +array[j - 1].id) {
      swappedElements.push({
        current: { index: j, id: array[j].id },
        prev: { index: j - 1, id: array[j - 1].id },
      });
      const temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
      j--;
    }
    effects.push(swappedElements);
  }
  return effects;
}
export function InsertionSortAnimation(array, effects, elementSize) {
  let ctr = 0;
  let timeAccToWidth = Math.floor(Number(elementSize) / 10);
  console.log(timeAccToWidth);
  let delayAccToWidth = 1,
    delayAccToWidthColor = 1;
  if (timeAccToWidth >= 7) {
    timeAccToWidth *= 100;
    delayAccToWidth = 1.01;
    delayAccToWidthColor = 1.006;
  } else if (timeAccToWidth >= 6) {
    timeAccToWidth *= 80;
    delayAccToWidth = 1.009;
    delayAccToWidthColor = 1.006;
  } else if (timeAccToWidth >= 5) {
    timeAccToWidth *= 60;
    delayAccToWidth = 1.007;
    delayAccToWidthColor = 1.005;
  } else if (timeAccToWidth >= 4) {
    timeAccToWidth *= 40;
    delayAccToWidth = 1.004;
    delayAccToWidthColor = 1.003;
  } else if (timeAccToWidth >= 2) {
    delayAccToWidth = 1.002;
    delayAccToWidthColor = 1.0015;
    timeAccToWidth *= 20;
  }
  console.log(delayAccToWidth);
  for (let i = 0; i < effects.length; i++) {
    setTimeout(() => {});
    const swappedIndexArray = effects[i];
    for (let j = 0; j < swappedIndexArray.length; j++) {
      const { current, prev } = swappedIndexArray[j];
      const currentId = current.id;
      const prevId = prev.id;
      const currentElement = array[current.index];
      const prevElement = array[prev.index];
      setTimeout(() => {
        currentElement.style.backgroundColor = `rgb(${255 - current_RGB.red},${
          255 - current_RGB.green
        },${255 - current_RGB.blue})`;
        currentElement.style.borderColor = `rgb(${current_RGB.red},${current_RGB.green},${current_RGB.blue})`;
        prevElement.style.backgroundColor = `rgb(${255 - current_RGB.red},${
          255 - current_RGB.green
        },${255 - current_RGB.blue})`;
        prevElement.style.borderColor = `rgb(${current_RGB.red},${current_RGB.green},${current_RGB.blue})`;
      }, ctr * timeAccToWidth * delayAccToWidthColor);

      setTimeout(() => {
        currentElement.id = prevId;
        currentElement.style.height = `${prevId}%`;
        prevElement.id = currentId;
        prevElement.style.height = `${currentId}%`;
      }, ctr * timeAccToWidth * delayAccToWidth);

      setTimeout(() => {
        currentElement.style.backgroundColor = `rgb(${current_RGB.red},${current_RGB.green},${current_RGB.blue})`;
        currentElement.style.borderColor = `rgb(${255 - current_RGB.red},${
          255 - current_RGB.green
        },${255 - current_RGB.blue})`;

        prevElement.style.backgroundColor = `rgb(${current_RGB.red},${current_RGB.green},${current_RGB.blue})`;
        prevElement.style.borderColor = `rgb(${255 - current_RGB.red},${
          255 - current_RGB.green
        },${255 - current_RGB.blue})`;
      }, ctr * timeAccToWidth * delayAccToWidth);
      ctr++;
    }
  }
  console.log(ctr);
}
