import React, { useState, useRef, useEffect } from "react";
import styles from "./Widget.module.css";
import photo1 from "../../images/photo1.jpeg";
import photo2 from "../../images/photo2.jpeg";

const Widget = () => {
  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const [photoWidth, setPhotoWidth] = useState("");

  const [leftWidgetOffset, setLeftWidgetOffset] = useState("");

  const containerRef = useRef(null);

  useEffect(() => setLeftWidgetOffset(getWidgetDimentions()), []);

  const getWidgetDimentions = () => {
    return containerRef.current.getBoundingClientRect().x;
  };

  const handleMouseMove = (ev) => {
    setMousePosition({ left: ev.pageX, top: ev.pageY });
    const offset = MousePosition.left - leftWidgetOffset;
    setPhotoWidth(offset + "px");
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseMove={(ev) => handleMouseMove(ev)}
    >
      <div className={styles.box1}>
        <div className={styles.box1inner} style={{ width: photoWidth }}>
          <img className={styles.photo1} src={photo1} alt="" />
        </div>
      </div>
      <div className={styles.box2}>
        <img className={styles.photo2} src={photo2} alt="" />
      </div>
    </div>
  );
};

export default Widget;
