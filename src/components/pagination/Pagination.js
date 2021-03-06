import React from "react";
import styles from "./Pagination.module.css";
import classnames from "classnames";
import sprite from "../../images/sprite.svg";

const createArr = (p) => {
  const arr = [];
  for (let i = 1; i <= p; i++) {
    arr.push(i);
  }
  return arr;
};

const Pagination = ({ pages = 20, currentPage = 1, onPageChange }) => {
  const [paginationArr, setPaginationArr] = React.useState([]);

  const currentIndex = React.useMemo(() => {
    return currentPage - 1;
  }, [currentPage]);
  React.useEffect(() => {
    setPaginationArr(createArr(pages));
  }, [pages]);

  const arrayToDisplay = React.useMemo(() => {
    const arr = [...paginationArr];
    const len = arr.length;

    if (len < 3) {
      return [];
    }

    if (len === 3) {
      return [null, paginationArr[1], null];
    }

    if (currentIndex === 0 || currentIndex === 1 || currentIndex === 2) {
      arr[0] = null;
    }

    if (
      currentIndex === len - 1 ||
      currentIndex === len - 2 ||
      currentIndex === len - 3
    ) {
      arr[len - 1] = null;
    }

    for (let i = 0; i < currentIndex - 1; i++) {
      arr[i] = null;
    }
    for (let i = currentIndex + 2; i < len; i++) {
      arr[i] = null;
    }

    return arr;
  }, [currentIndex, paginationArr]);

  console.log(currentPage);

  const onNextClick = () => {
    onPageChange(Number(currentPage) + 1);
  };

  const onPrevClick = () => {
    onPageChange(Number(currentPage) - 1);
  };

  const onElementClick = (i) => {
    onPageChange(i + 1);
  };
  return (
    <>
      <div className={styles.container}>
        <button
          onClick={onPrevClick}
          className={classnames([
            styles.button,
            {
              [styles.buttonDisabled]: currentIndex === 0,
            },
          ])}
          disabled={currentIndex === 0}
        >
          <svg width="10" height="10">
            <use href={sprite + "#left-arrow"} />
          </svg>
          Prev
        </button>
        <div
          onClick={() => onElementClick(0)}
          className={classnames([
            styles.elem,
            { [styles.elemActive]: currentIndex === 0 },
          ])}
        >
          1
        </div>
        <div
          className={classnames([
            styles.elem,
            {
              [styles.hidden]: currentIndex < 3,
            },
          ])}
        >
          ...
        </div>
        {arrayToDisplay.map(
          (item, index) =>
            item && (
              <div
                onClick={() => onElementClick(index)}
                key={index}
                className={classnames([
                  styles.elem,
                  { [styles.elemActive]: index === currentIndex },
                ])}
              >
                {item}
              </div>
            )
        )}
        <div
          className={classnames([
            styles.elem,
            {
              [styles.hidden]: currentIndex > paginationArr.length - 4,
            },
          ])}
        >
          ...
        </div>
        <div
          onClick={() => onElementClick(paginationArr.length - 1)}
          className={classnames([
            styles.elem,
            { [styles.elemActive]: currentIndex === paginationArr.length - 1 },
            { [styles.hidden]: paginationArr.length === 1 },
          ])}
        >
          {paginationArr[paginationArr.length - 1]}
        </div>
        <button
          onClick={onNextClick}
          className={classnames([
            styles.button,
            {
              [styles.buttonDisabled]:
                currentIndex === paginationArr.length - 1,
            },
          ])}
          disabled={currentIndex === paginationArr.length - 1}
        >
          Next
          <svg width="10" height="10">
            <use href={sprite + "#right-arrow"} />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Pagination;
