import { current_RGB, generateRGBValue } from "./frameContentLogic";

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

export function bubbleSort(array) {
  const effects = [];
  let length = array.length;
  for (let i = 0; i < array.length; i++) {
    let hasSwapped = false;
    const swappedElements = [];
    for (let j = 0; j < length - 1; j++) {
      if (+array[j].id > +array[j + 1].id) {
        swappedElements.push({
          current: { index: j, id: array[j].id },
          prev: { index: j + 1, id: array[j + 1].id },
        });
        hasSwapped = true;
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
    effects.push(swappedElements);
    length--;
    if (!hasSwapped) return effects;
  }
  return effects;
}

export function QuickSort(array) {
  const effects = [];
  QuickSortLogic(array, 0, array.length - 1, effects);
  return effects;
}

function QuickSortLogic(array, startIdx, endIdx, effects) {
  if (startIdx >= endIdx) {
    return;
  }

  let pivotIdx = startIdx,
    leftIdx = startIdx + 1,
    rightIdx = endIdx,
    candidateElements = [],
    candidateObject;

  while (rightIdx >= leftIdx) {
    if (
      +array[leftIdx].id > +array[pivotIdx].id &&
      +array[rightIdx].id < +array[pivotIdx].id
    ) {
      candidateObject = swap(leftIdx, rightIdx, pivotIdx, array);
      leftIdx++;
      rightIdx--;
    } else if (+array[leftIdx].id <= +array[pivotIdx].id) {
      candidateObject = {
        pivot: { index: pivotIdx, id: array[pivotIdx].id },
        left: { index: leftIdx, id: array[leftIdx].id },
        right: { index: rightIdx, id: array[rightIdx].id },
        flag: false,
      };
      leftIdx++;
    } else if (+array[rightIdx].id >= +array[pivotIdx].id) {
      candidateObject = {
        pivot: { index: pivotIdx, id: array[pivotIdx].id },
        left: { index: leftIdx, id: array[leftIdx].id },
        right: { index: rightIdx, id: array[rightIdx].id },
        flag: false,
      };
      rightIdx--;
    }
    candidateElements.push(candidateObject);
  }
  candidateObject = swap(pivotIdx, rightIdx, pivotIdx, array);
  candidateElements.push(candidateObject);
  effects.push(candidateElements);

  const isLeftArraySmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (isLeftArraySmaller) {
    QuickSortLogic(array, startIdx, rightIdx - 1, effects);
    QuickSortLogic(array, rightIdx + 1, endIdx, effects);
  } else {
    QuickSortLogic(array, rightIdx + 1, endIdx, effects);
    QuickSortLogic(array, startIdx, rightIdx - 1, effects);
  }
}

function swap(leftIdx, rightIdx, pivotIdx, array) {
  const candidateObject = {
    pivot: { index: pivotIdx, id: array[pivotIdx].id },
    left: { index: leftIdx, id: array[leftIdx].id },
    right: { index: rightIdx, id: array[rightIdx].id },
    flag: true,
  };
  const temp = array[leftIdx];
  array[leftIdx] = array[rightIdx];
  array[rightIdx] = temp;
  return candidateObject;
}

export function QuickSortAnimation(array, effects, elementSize) {
  let ctr = 0;
  let Width = Math.floor(Number(elementSize) / 10);
  let length = 0;
  let pivotColor = {
    red: generateRGBValue(),
    green: generateRGBValue(),
    blue: generateRGBValue(),
  };
  for (let i = 0; i < effects.length; i++) {
    length += effects[i].length;
  }

  const {
    timeAccToWidth,
    delayAccToWidth,
    delayAccToWidthColor,
    quickSortDelay,
  } = toggleSpeed(Width);
  toggleDisability(true);

  for (let i = 0; i < effects.length; i++) {
    const swappedIndexArray = effects[i];
    for (let j = 0; j < swappedIndexArray.length; j++) {
      const { pivot, left, right, flag } = swappedIndexArray[j];
      const pivotId = pivot.id;
      const leftId = left.id;
      const rightId = right.id;
      const pivotElement = array[pivot.index];
      const leftElement = array[left.index];
      const rightElement = array[right.index];

      setTimeout(() => {
        pivotElement.style.backgroundColor = `rgb(${255 - pivotColor.red},${
          255 - pivotColor.green
        },${255 - pivotColor.blue})`;
        pivotElement.style.borderColor = `rgb(${pivotColor.red},${pivotColor.green},${pivotColor.blue})`;
        if (flag) {
          switchCandidateColor(leftElement, {
            red: pivotColor.red,
            green: pivotColor.green,
            blue: pivotColor.blue,
          });
          switchCandidateColor(rightElement, {
            red: pivotColor.red,
            green: pivotColor.green,
            blue: pivotColor.blue,
          });
        } else {
          switchCandidateColor(leftElement, {
            red: current_RGB.red,
            green: current_RGB.green,
            blue: current_RGB.blue,
          });
          switchCandidateColor(rightElement, {
            red: current_RGB.red,
            green: current_RGB.green,
            blue: current_RGB.blue,
          });
        }
      }, ctr * timeAccToWidth * delayAccToWidthColor * quickSortDelay);

      if (swappedIndexArray.length - 1 !== j) {
        switchHeightAndColor(
          leftId,
          rightId,
          leftElement,
          rightElement,
          ctr,
          timeAccToWidth,
          delayAccToWidth,
          flag,
          quickSortDelay
        );
      } else {
        switchHeightAndColor(
          pivotId,
          rightId,
          pivotElement,
          rightElement,
          ctr,
          timeAccToWidth,
          delayAccToWidth,
          flag,
          quickSortDelay
        );
      }
      ctr++;
    }
  }

  setTimeout(() => {
    toggleDisability(false);
  }, length * timeAccToWidth * delayAccToWidth * quickSortDelay);
}

function switchHeightAndColor(
  leftId,
  rightId,
  leftElement,
  rightElement,
  ctr,
  timeAccToWidth,
  delayAccToWidth,
  flag,
  quickSortDelay
) {
  setTimeout(() => {
    if (flag) {
      leftElement.id = rightId;
      leftElement.style.height = `${rightId}%`;
      rightElement.id = leftId;
      rightElement.style.height = `${leftId}%`;
    }
  }, ctr * timeAccToWidth * delayAccToWidth * (quickSortDelay + 0.005));
  setTimeout(() => {
    leftElement.style.backgroundColor = `rgb(${current_RGB.red},${current_RGB.green},${current_RGB.blue})`;
    leftElement.style.borderColor = `rgb(${255 - current_RGB.red},${
      255 - current_RGB.green
    },${255 - current_RGB.blue})`;

    rightElement.style.backgroundColor = `rgb(${current_RGB.red},${current_RGB.green},${current_RGB.blue})`;
    rightElement.style.borderColor = `rgb(${255 - current_RGB.red},${
      255 - current_RGB.green
    },${255 - current_RGB.blue})`;
  }, ctr * timeAccToWidth * delayAccToWidth * (quickSortDelay + 0.005));
}

function switchCandidateColor(element, color) {
  element.style.backgroundColor = `rgb(${255 - color.red},${
    255 - color.green
  },${255 - color.blue})`;
  element.style.borderColor = `rgb(${color.red},${color.green},${color.blue})`;
}

export function InsertionSortAnimation(array, effects, elementSize) {
  let ctr = 0;
  let Width = Math.floor(Number(elementSize) / 10);
  let length = effects.length;
  for (let i = 0; i < effects.length; i++) {
    length += effects[i].length;
  }
  const { timeAccToWidth, delayAccToWidth, delayAccToWidthColor } =
    toggleSpeed(Width);

  toggleDisability(true);
  for (let i = 0; i < effects.length; i++) {
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
  setTimeout(() => {
    toggleDisability(false);
  }, length * timeAccToWidth * delayAccToWidth);
}

const toggleDisability = (flag) => {
  const generate = document.getElementById("generate");
  const size = document.getElementById("Size");
  const sort = document.getElementById("sort");
  generate.disabled = flag;
  size.disabled = flag;
  sort.disabled = flag;
};

const toggleSpeed = (timeAccToWidth) => {
  let delayAccToWidth = 1,
    delayAccToWidthColor = 1,
    quickSortDelay = 5;
  if (timeAccToWidth >= 7) {
    timeAccToWidth *= 100;
    delayAccToWidth = 1.01;
    delayAccToWidthColor = 1.006;
    quickSortDelay = 0.9;
  } else if (timeAccToWidth >= 6) {
    timeAccToWidth *= 80;
    delayAccToWidth = 1.009;
    delayAccToWidthColor = 1.006;
    quickSortDelay = 0.75;
  } else if (timeAccToWidth >= 5) {
    timeAccToWidth *= 60;
    delayAccToWidth = 1.007;
    delayAccToWidthColor = 1.005;
    quickSortDelay = 0.7;
  } else if (timeAccToWidth >= 4) {
    timeAccToWidth *= 40;
    delayAccToWidth = 1.004;
    delayAccToWidthColor = 1.003;
    quickSortDelay = 1.005;
  } else if (timeAccToWidth >= 2) {
    delayAccToWidth = 1.002;
    delayAccToWidthColor = 1.0015;
    timeAccToWidth *= 20;
    quickSortDelay = 1.05;
  }

  return {
    timeAccToWidth,
    delayAccToWidth,
    delayAccToWidthColor,
    quickSortDelay,
  };
};
