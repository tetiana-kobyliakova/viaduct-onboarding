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

  const isArray = React.useMemo(() => Array.isArray(children), [children]);

  return (
    <div>
      <div className={styles.wrapper}>
        <ul className={styles.tabs} ref={tabs}>
          {isArray ? (
            children.map((child, index) => {
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
            })
          ) : (
            <TabItem
              activeTab={activeTab}
              key={children.props.label}
              label={children.props.label}
              index={0}
              onClick={onClickTabItem}
            />
          )}
        </ul>
        <div
          className={styles.line}
          style={{
            left: isArray ? (activeTab * tabsWidth) / children.length : 0,
          }}
        ></div>
      </div>
      <div className={styles.tabContent}>
        {isArray
          ? children.map((child, index) => {
              if (index !== activeTab) return null;
              return child.props.children;
            })
          : children.props.children}
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
