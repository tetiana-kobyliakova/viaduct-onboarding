import React from "react";
import styles from "./Tabs.module.css";

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  console.log(activeTab);
  return (
    <div>
      <div className={styles.wrapper}>
        <ul className={styles.tabs}>
          {children.map((child, index) => {
            const { label } = child.props;
            return (
              <TabItem
                activeTab={activeTab}
                key={label}
                label={label}
                index={index}
                onClick={onClickTabItem}
              />
            );
          })}
        </ul>
        <div className={styles.line} style={{ left: activeTab * 150 }}></div>
      </div>
      <div className={styles.tabContent}>
        {children.map((child, index) => {
          if (index !== activeTab) return null;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export const TabItem = ({ label, index, onClick }) => {
  const onTabClick = () => {
    onClick(index);
  };
  return (
    <li onClick={onTabClick} className={styles.tabItem}>
      {label.toUpperCase()}
    </li>
  );
};

// className={classnames([
//         styles.tabItem,
//         { [styles.tabItemActive]: index === activeTab },
//       ])}
