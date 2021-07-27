import React from "react";
import styles from "./Form.module.css";

const ErrorName = ({ error }) => {
  return (
    <div className={styles.errorBlockName}>
      <p className={styles.error}>{error}</p>
    </div>
  );
};

export default ErrorName;
