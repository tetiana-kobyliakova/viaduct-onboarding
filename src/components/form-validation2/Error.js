import React from "react";
import styles from "./Form2.module.css";

const Error = ({ error }) => {
  return (
    <div className={styles.errorBlock}>
      <p className={styles.error}>{error}</p>
    </div>
  );
};

export default Error;
