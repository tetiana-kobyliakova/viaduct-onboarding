import React from "react";
import styles from "./Select.module.css";

const Select = ({ gender, onHandleChange, allGenders }) => {
  return (
    <select className={styles.select} value={gender} onChange={onHandleChange}>
      {allGenders.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
