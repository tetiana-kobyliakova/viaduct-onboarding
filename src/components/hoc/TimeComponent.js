import React from "react";
import timeHigherOrderComponent from "./TimeHOC";
import styles from "./TimeComponent.module.css";
import { getTimeComponents } from "./TimeHOC";
//const dateInit = Date.now();
const TimeComponent = ({ title, time }) => {
  const dateInit = React.useMemo(() => Date.now(), []);
  const timeDiff = React.useMemo(() => time - dateInit, [time]);
  const { days, hours, mins, secs } = getTimeComponents(timeDiff);
  console.log(getTimeComponents(timeDiff), time);
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
