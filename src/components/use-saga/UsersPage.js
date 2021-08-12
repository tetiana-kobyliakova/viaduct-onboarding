import React from "react";
import styles from "./UsersPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sagaSelector } from "../../reducers/saga-users";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const UsersPage = () => {
  const { fetching, users, error } = useSelector(sagaSelector);
  const dispatch = useDispatch();
  const onRequestUser = () => {
    dispatch({ type: "API_CALL_REQUEST" });
  };
  return (
    <div>
      <h1>Use saga</h1>
      <button className={styles.button} onClick={onRequestUser}>
        Load users
      </button>
      {error && <p className={styles.error}>Something went wrong</p>}
      <div className={styles.wrapper}>
        {fetching ? (
          <Loader
            type="Puff"
            color="#246CC6"
            height={100}
            width={100}
            timeout={3000}
          />
        ) : (
          <ul className={styles.list}>
            {users &&
              users.map((user) => (
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
    </div>
  );
};

export default UsersPage;
