import React from "react";
import styles from "./Tabs.module.css";
import classnames from "classnames";

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState(children[0].props.label);
  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className={styles.tabs}>
        {children.map((child) => {
          const { label } = child.props;
          return (
            <TabItem
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ul>
      <div className={styles.tabContent}>
        {children.map((child) => {
          if (child.props.label !== activeTab) return null;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export const TabItem = ({ activeTab, label, onClick }) => {
  const onTabClick = () => {
    onClick(label);
  };
  return (
    <li
      onClick={onTabClick}
      className={classnames([
        styles.tabItem,
        { [styles.tabItemActive]: label === activeTab },
      ])}
    >
      {label.toUpperCase()}
    </li>
  );
};
