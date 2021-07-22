import React from "react";
import styles from "./Button.module.css";

const Button = ({ isAscending, changeOrder }) => {
  return (
    <button className={styles.button} onClick={changeOrder}>
      Change order to {isAscending ? "descending" : "ascending"}
    </button>
  );
};
export default Button;
