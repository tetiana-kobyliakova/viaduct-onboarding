import React from "react";
import styles from "./DropDown.module.css";
import classnames from "classnames";

const useOpenDropDown = (btnRef, dropDownRef) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onDocClick = (e) => {
    if (e.target === btnRef.current) {
      setIsOpen(!isOpen);
      return;
    }
    if (e.target === dropDownRef.current) {
      return;
    }
    setIsOpen(false);
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  });

  return isOpen;
};
const DropDown = () => {
  const buttonRef = React.useRef(null);
  const dropDownRef = React.useRef(null);

  const isOpen = useOpenDropDown(buttonRef, dropDownRef);

  return (
    <div className={styles.wrapper}>
      <button ref={buttonRef}>DropDown Menu</button>
      <div
        ref={dropDownRef}
        className={classnames([styles.list, { [styles.isOpen]: isOpen }])}
      >
        fgdgd fgdgg gggg fgfgf fgfgf fgfgf fgfgf
      </div>
    </div>
  );
};

export default DropDown;
