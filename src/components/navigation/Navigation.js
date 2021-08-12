import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const links = [
  { link: "/", title: "home page" },
  { link: "/pagination", title: "pagination" },
  { link: "/slider", title: "slider" },
  { link: "/user-list", title: "user list" },
  { link: "/form-validation", title: "form validation" },
  { link: "/tabs", title: "tabs" },
  { link: "/zoom-widget", title: "zoom widget" },
  { link: "/photo-widget", title: "photo widget" },
  { link: "/color-array", title: "color array" },
  { link: "/dropdown-menu", title: "drop down menu" },
  { link: "/debounce", title: "debounce" },
  { link: "/hoc", title: "Higher order component" },
  { link: "/multi-step-form", title: "Multi-step form" },
  { link: "/transition", title: "Transition css" },
];
const Navigation = () => {
  return (
    <div className={styles.nav}>
      <h2 className={styles.title}>Menu</h2>
      <ul className={styles.list}>
        {links.map(({ link, title }) => {
          return link === "/" ? (
            <li className={styles.item} key={link}>
              <NavLink
                exact
                to={link}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                {title}
              </NavLink>
            </li>
          ) : (
            <li className={styles.item} key={link}>
              <NavLink
                to={link}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
