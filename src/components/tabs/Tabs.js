import React, { useEffect } from "react";
import styles from "./Tabs.module.css";

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  const tabs = React.useRef();

  const [tabsWidth, setTabsWidth] = React.useState(0);

  useEffect(() => {
    setTabsWidth(getTabsWidth());
  }, [tabsWidth]);

  const getTabsWidth = () => {
    return tabs.current.getBoundingClientRect().width;
  };

  const childrenList = React.useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  return (
    <div>
      <div className={styles.wrapper}>
        <ul className={styles.tabs} ref={tabs}>
          {childrenList.map((child, index) => {
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
        <div
          className={styles.line}
          style={{
            left: (activeTab * tabsWidth) / childrenList.length,
          }}
        ></div>
      </div>
      <div className={styles.tabContent}>
        {childrenList.map((child, index) => {
          if (index !== activeTab) return null;
          return child;
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
      {label}
    </li>
  );
};
