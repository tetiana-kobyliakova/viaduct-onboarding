import React from "react";
import styles from "./Transition.module.css";

const arr = [];
for (let i = 0; i < 70; i++) {
  arr.push(i);
}
const Transition = () => {
  return (
    <div>
      <h1>Transition</h1>
      <input type="checkbox" className={styles.checkbox} id="check" />
      <label htmlFor="check" className={styles.label}>
        Radius mod
      </label>

      <div className={styles.container}>
        {arr.map((item) => (
          <div className={styles.box}>
            <div className={styles["inner-box"]}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transition;
