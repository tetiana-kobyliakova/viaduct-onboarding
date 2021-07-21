import React from "react";
import styles from "./ColorArray.module.css";
import { cloneDeep } from "lodash";

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const generateColorsMatrix = () => {
  const colors = [
    { color: "teal", opacity: 1 },
    { color: "orange", opacity: 1 },
    { color: "steelblue", opacity: 1 },
    { color: "teal", opacity: 1 },
    { color: "orange", opacity: 1 },
    { color: "steelblue", opacity: 1 },
  ];
  const newColors = [];
  for (let i = 0; i < 6; i += 1) {
    newColors.push(shuffleArray(cloneDeep(colors)));
  }
  return newColors;
};

const ColorArray = () => {
  const [newColors, setNewColors] = React.useState([]);

  React.useEffect(() => setNewColors(generateColorsMatrix()), []);
  console.log(newColors);
  const highlightBoxes = (idx1, idx2) => {
    const arr = cloneDeep(newColors);
    const color = arr[idx1][idx2].color;
    arr[idx1][idx2].opacity = 0.5;
    const maxVerticalIndex = arr.length - 1;
    const maxHorizontalIndex = arr[0].length - 1;

    if (idx1 === 0) {
      if (arr[idx1 + 1][idx2].color === color) {
        arr[idx1 + 1][idx2].opacity = 0.5;
        //highlightBoxes(idx1 + 1, idx2);
      }
    } else if (idx1 === maxVerticalIndex) {
      if (arr[idx1 - 1][idx2].color === color) {
        arr[idx1 - 1][idx2].opacity = 0.5;
        //highlightBoxes(idx1 - 1, idx2);
      }
    } else {
      if (arr[idx1 + 1][idx2].color === color) {
        arr[idx1 + 1][idx2].opacity = 0.5;
        //highlightBoxes(idx1 + 1, idx2);
      }
      if (arr[idx1 - 1][idx2].color === color) {
        arr[idx1 - 1][idx2].opacity = 0.5;
        //highlightBoxes(idx1 - 1, idx2);
      }
    }

    if (idx2 === 0) {
      if (arr[idx1][idx2 + 1].color === color) {
        arr[idx1][idx2 + 1].opacity = 0.5;
        //highlightBoxes(idx1, idx2 + 1);
      }
    } else if (idx2 === maxHorizontalIndex) {
      if (arr[idx1][idx2 - 1].color === color) {
        arr[idx1][idx2 - 1].opacity = 0.5;
        //highlightBoxes(idx1, idx2 - 1);
      }
    } else {
      if (arr[idx1][idx2 + 1].color === color) {
        arr[idx1][idx2 + 1].opacity = 0.5;
        //highlightBoxes(idx1, idx2 + 1);
      }
      if (arr[idx1][idx2 - 1].color === color) {
        arr[idx1][idx2 - 1].opacity = 0.5;
        //highlightBoxes(idx1, idx2 - 1);
      }
    }

    console.log(arr);
    setNewColors(arr);
  };

  return (
    <div className={styles.container}>
      {newColors.map((item, idx) =>
        item.map((i, index) => (
          <div
            key={index}
            className={styles.block}
            style={{ backgroundColor: i.color, opacity: i.opacity }}
            onClick={() => highlightBoxes(idx, index)}
          >
            {i.color}
          </div>
        ))
      )}
    </div>
  );
};

export default ColorArray;
