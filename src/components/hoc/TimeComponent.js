import React from "react";
import timeHigherOrderComponent from "./TimeHOC";
import styles from "./TimeComponent.module.css";

const TimeComponent = ({ title, time: { days, hours, mins, secs } }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div className={styles.timer}>
        <div className={styles.field}>
          <div className={styles.value}>{days}</div>
          <div className={styles.label}>Days</div>
        </div>
        <div className={styles.field}>
          <div className={styles.value}>{hours}</div>
          <div className={styles.label}>Hours</div>
        </div>
        <div className={styles.field}>
          <div className={styles.value}>{mins}</div>
          <div className={styles.label}>Minutes</div>
        </div>
        <div className={styles.field}>
          <div className={styles.value}>{secs}</div>
          <div className={styles.label}>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default timeHigherOrderComponent(TimeComponent);
