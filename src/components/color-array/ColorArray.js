import React from "react";
import styles from "./ColorArray.module.css";
import { cloneDeep, shuffle, range, get } from "lodash";
import classnames from "classnames";
// function shuffleArray(array) {
//   const newArr = [...array];
//   for (let i = newArr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
//   }
//   return newArr;
// }

const generateColorsMatrix = () => {
  const colors = [
    { color: "teal", isHighlighted: false },
    { color: "orange", isHighlighted: false },
    { color: "steelblue", isHighlighted: false },
    { color: "teal", isHighlighted: false },
    { color: "orange", isHighlighted: false },
    { color: "steelblue", isHighlighted: false },
  ];
  // const newColors = [];
  // for (let i = 0; i < 6; i += 1) {
  //   newColors.push(shuffleArray(cloneDeep(colors)));
  // }
  // return newColors;
  const newColors = range(6);
  return newColors.map(() => shuffle(colors));
};

function findColors({ matrixArr, idx1, idx2, color }) {
  const highlightedIndexes = [];

  function findColorsRecursive({ matrixArr, idx1, idx2, color }) {
    highlightedIndexes.push([idx1, idx2]);

    function hasTheSameColor(idx1, idx2) {
      if (
        get(matrixArr, `[${idx1}][${idx2}].color`) === color &&
        !highlightedIndexes.some(([i1, i2]) => idx1 === i1 && idx2 === i2)
      ) {
        findColorsRecursive({ matrixArr, idx1, idx2, color });
      }
    }

    hasTheSameColor(idx1, idx2 - 1);
    hasTheSameColor(idx1, idx2 + 1);
    hasTheSameColor(idx1 + 1, idx2);
    hasTheSameColor(idx1 - 1, idx2);

    return highlightedIndexes;
  }

  return findColorsRecursive({ matrixArr, idx1, idx2, color });
}

const ColorArray = () => {
  const [newColors, setNewColors] = React.useState([]);

  React.useEffect(() => setNewColors(generateColorsMatrix()), []);

  const highlightBoxes = (idx1, idx2) => {
    const color = newColors[idx1][idx2].color;
    // arr[idx1][idx2].opacity = 0.5;
    // const maxVerticalIndex = arr.length - 1;
    // const maxHorizontalIndex = arr[0].length - 1;

    const highlightedIndexes = findColors({
      matrixArr: newColors,
      idx1,
      idx2,
      color,
    });

    setNewColors(
      newColors.map((e, ei) => {
        return e.map((f, fi) => {
          if (highlightedIndexes.some(([i1, i2]) => ei === i1 && fi === i2)) {
            return { ...f, isHighlighted: true };
          }
          return { ...f, isHighlighted: false };
        });
      })
    );
  };

  return (
    <div className={classnames([styles.container])}>
      {newColors.map((item, idx) =>
        item.map((i, index) => (
          <div
            key={index}
            className={classnames([
              styles.block,
              { [styles.highlited]: i.isHighlighted },
            ])}
            style={{ backgroundColor: i.color }}
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
