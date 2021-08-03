import React from "react";
import styles from "./DropDown.module.css";
import classnames from "classnames";

const useCloseDropDown = (elemRef, stateManager) => {
  const onDocClick = (e) => {
    if (elemRef.current.contains(e.target)) {
      return;
    }
    stateManager(false);
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return onDocClick;
};

const DropDown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  useCloseDropDown(buttonRef, setIsOpen);

  const toggle = () => setIsOpen((isOpen) => !isOpen);

  return (
    <div ref={buttonRef} className={styles.wrapper}>
      <button onClick={toggle}>DropDown Menu</button>
      <ul className={classnames([styles.list, { [styles.isOpen]: isOpen }])}>
        <li>
          <a href="#">one</a>
        </li>
        <li>
          <a href="#">two</a>
        </li>
        <li>
          <a href="#">three</a>
        </li>
        <li>
          <a href="#">four</a>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
