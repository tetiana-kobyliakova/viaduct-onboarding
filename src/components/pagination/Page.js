import React from "react";
import styles from "./Page.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Page = ({ number, usersList, isLoading }) => {
  console.log(isLoading);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>This is page number {number}</h2>
      {isLoading ? (
        <Loader
          type="Puff"
          color="#246CC6"
          height={100}
          width={100}
          timeout={3000}
        />
      ) : (
        <ul className={styles.list}>
          {usersList.map((user) => (
            <li key={user.email} className={styles.item}>
              <img src={user.picture.medium} alt="" />
              <p>
                {user.name.first} {user.name.last}
              </p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
