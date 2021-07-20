import React, { useState, useEffect, useRef } from "react";
import styles from "./ZoomWidget.module.css";
import smallImage from "../../images/small-image.jpg";
import largeImage from "../../images/large-image.jpg";

const ZoomWidget = () => {
  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const [photoDimentions, setPhotoDimentions] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const photoRef = useRef(null);

  const getPhotoDimentions = () => {
    return {
      x: photoRef.current.getBoundingClientRect().x,
      y: photoRef.current.getBoundingClientRect().y,
      width: photoRef.current.getBoundingClientRect().width,
      height: photoRef.current.getBoundingClientRect().height,
    };
  };
  const getLargeImageCoord = () => {
    return {
      left: Math.round(
        ((MousePosition.left - photoDimentions.x) / photoDimentions.width) * 100
      ),
      top: Math.round(
        ((MousePosition.top - photoDimentions.y) / photoDimentions.height) * 100
      ),
    };
  };

  const [largeCoord, setLargeCoord] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    setPhotoDimentions(getPhotoDimentions());
  }, []);

  const [showGlass, setShowGlass] = useState(false);

  const handleMouseMove = (ev) => {
    setMousePosition({ left: ev.pageX, top: ev.pageY });
    setLargeCoord(getLargeImageCoord());
    setShowGlass(true);
    if (
      ev.pageX > photoDimentions.x + photoDimentions.width ||
      ev.pageX < photoDimentions.x ||
      ev.pageY < photoDimentions.y ||
      ev.pageY > photoDimentions.y + photoDimentions.height
    ) {
      setShowGlass(false);
    }
    console.log(largeCoord);

    console.log(photoDimentions);
  };

  return (
    <>
      <div
        className={styles["img-thumb"]}
        onMouseMove={(ev) => handleMouseMove(ev)}
      >
        <img
          ref={photoRef}
          className={styles.small}
          src={smallImage}
          width="960px"
          height="600px"
        />
        {showGlass && (
          <div
            className={styles.glass}
            style={{
              left: MousePosition.left - 75,
              top: MousePosition.top - 75,
            }}
          >
            <img
              src={largeImage}
              style={{
                transform: `translate(-${largeCoord.left - 4}%, -${
                  largeCoord.top - 6
                }%)`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

/* const Glass = ({ leftOffset, topOffset }) => {
  return (
    <div
      className={styles.glass}
      style={{ left: leftOffset, top: topOffset }}
    ></div>
  );
}; */

export default ZoomWidget;

/* const leftOffset = MousePosition.left - leftPhoto + "px";
    const topOffset = MousePosition.top - topPhoto + "px";
    setLeftOffset(leftOffset);
    setRightOffset(topOffset);
    console.log(leftOffset);
    console.log(topOffset); */

/*  if (
      MousePosition.left > photoDimentions.x ||
      MousePosition.top > photoDimentions.y ||
      MousePosition.left < photoDimentions.x + photoDimentions.width ||
      MousePosition.top < photoDimentions.y + photoDimentions.height
    ) {
      setShowGlass(true);
    } else {
      setShowGlass(false);
    }

     */
