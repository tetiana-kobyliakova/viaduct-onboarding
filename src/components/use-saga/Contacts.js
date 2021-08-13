import React from "react";
import { useSelector } from "react-redux";
import { contactsSelector } from "../../reducers/user-contacts";
import styles from "./Contacts.module.css";

const Contacts = () => {
  const { contacts, error } = useSelector(contactsSelector);
  return (
    <div className={styles.contacts}>
      {contacts.length > 0 && <h2 className={styles.title}>Contacts</h2>}
      {error && <p className={styles.error}>Something went wrong</p>}
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {contacts &&
            contacts.map((user) => (
              <li key={user.email} className={styles.item}>
                <img src={user.picture.medium} alt="" />
                <p>
                  {user.name.first} {user.name.last}
                </p>
                <p>{user.email}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
