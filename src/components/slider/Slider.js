import React from "react";
import styles from "./Slider.module.css";
import img1 from "../../images/photo1.jpeg";
import img2 from "../../images/photo2.jpeg";
import img3 from "../../images/photo_3.jpg";
import img4 from "../../images/photo4.jpg";
import classnames from "classnames";
import sprite from "../../images/sprite.svg";

const slidesData = [img1, img2, img3, img4];

const Slider = ({ slides = slidesData }) => {
  const [slideNumber, setSlideNumber] = React.useState(0);

  const maxSlideIndex = React.useMemo(() => {
    return slides.length - 1;
  }, [slides]);

  const onLeftBtnClick = () => {
    setSlideNumber((prev) => prev - 1);
  };

  const onRightBtnClick = () => {
    setSlideNumber((prev) => prev + 1);
  };

  return (
    <>
      <h1>Slider</h1>
      <div className={styles.sliderContainer}>
        <button
          className={classnames([
            styles.leftButton,
            { [styles.btnDisabled]: slideNumber === 0 },
          ])}
          disabled={slideNumber === 0}
          onClick={onLeftBtnClick}
        >
          <svg width="50" height="50">
            <use href={sprite + "#left-arrow"} />
          </svg>
        </button>
        <button
          className={classnames([
            styles.rightButton,
            { [styles.btnDisabled]: slideNumber === maxSlideIndex },
          ])}
          disabled={slideNumber === maxSlideIndex}
          onClick={onRightBtnClick}
        >
          <svg width="50" height="50">
            <use href={sprite + "#right-arrow"} />
          </svg>
        </button>
        <div className={styles.slider}>
          <div className={styles.slides} style={{ left: -slideNumber * 840 }}>
            {slides.map((img) => (
              <div key={img}>
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.dots}>
        {slides.map((item, index) => (
          <div
            className={classnames([
              styles.dot,
              { [styles.dotActive]: index === slideNumber },
            ])}
            key={item}
            onClick={() => setSlideNumber(index)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Slider;
