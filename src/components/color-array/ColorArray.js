import React from "react";
import styles from "./ColorArray.module.css";

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const generateColorsMatrix = () => {
  const colors = ["teal", "orange", "steelblue", "teal", "orange", "steelblue"];
  const newColors = [];
  for (let i = 0; i < 6; i += 1) {
    newColors.push(shuffleArray(colors));
  }
  return newColors;
};

const ColorArray = () => {
  const [newColors, setNewColors] = React.useState([]);

  React.useEffect(() => setNewColors(generateColorsMatrix()), []);

  const highlightBoxes = (idx1, idx2) => {
    const arr = [...newColors];
    let color = arr[idx1][idx2];
    if (color.endsWith("X")) {
      color = color.substring(0, color.length - 1);
    }
    arr[idx1][idx2] = color + "X";
    const maxVerticalIndex = arr.length - 1;
    const maxHorizontalIndex = arr[0].length - 1;

    if (idx1 === 0) {
      if (arr[idx1 + 1][idx2] === color) {
        arr[idx1 + 1][idx2] = color + "X";
        highlightBoxes(idx1 + 1, idx2);
      }
    } else if (idx1 === maxVerticalIndex) {
      if (arr[idx1 - 1][idx2] === color) {
        arr[idx1 - 1][idx2] = color + "X";
        highlightBoxes(idx1 - 1, idx2);
      }
    } else {
      if (arr[idx1 + 1][idx2] === color) {
        arr[idx1 + 1][idx2] = color + "X";
        highlightBoxes(idx1 + 1, idx2);
      }
      if (arr[idx1 - 1][idx2] === color) {
        arr[idx1 - 1][idx2] = color + "X";
        highlightBoxes(idx1 - 1, idx2);
      }
    }

    if (idx2 === 0) {
      if (arr[idx1][idx2 + 1] === color) {
        arr[idx1][idx2 + 1] = color + "X";
        highlightBoxes(idx1, idx2 + 1);
      }
    } else if (idx2 === maxHorizontalIndex) {
      if (arr[idx1][idx2 - 1] === color) {
        arr[idx1][idx2 - 1] = color + "X";
        highlightBoxes(idx1, idx2 - 1);
      }
    } else {
      if (arr[idx1][idx2 + 1] === color) {
        arr[idx1][idx2 + 1] = color + "X";
        highlightBoxes(idx1, idx2 + 1);
      }
      if (arr[idx1][idx2 - 1] === color) {
        arr[idx1][idx2 - 1] = color + "X";
        highlightBoxes(idx1, idx2 - 1);
      }
    }

    console.log(arr);
    setNewColors(arr);
  };
  console.log(newColors);
  return (
    <div className={styles.container}>
      {newColors.map((item, idx) =>
        item.map((i, index) => (
          <div
            key={index}
            className={styles.block}
            style={{ backgroundColor: i }}
            onClick={() => highlightBoxes(idx, index)}
          >
            {i}
          </div>
        ))
      )}
    </div>
  );
};

export default ColorArray;
