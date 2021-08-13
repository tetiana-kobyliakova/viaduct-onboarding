import React, { useEffect, useMemo } from "react";
import styles from "./UserPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { contactsSelector } from "../../reducers/user-contacts";
import { profileSelector } from "../../reducers/profile";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Contacts from "./Contacts";
import Profile from "./Profile";
const UserPage = () => {
  const { fetching: fetchingContacts } = useSelector(contactsSelector);
  const { fetching: fetchingProfile } = useSelector(profileSelector);

  const fetching = useMemo(
    () => fetchingContacts || fetchingProfile,
    [fetchingContacts, fetchingProfile]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "userContacts/API_CALL_REQUEST" });
    dispatch({ type: "profile/API_CALL_REQUEST" });
  }, [dispatch]);

  return (
    <div>
      <h1>Use saga</h1>
      <div className={styles.wrapper}>
        {fetching ? (
          <Loader
            className={styles.loader}
            type="Puff"
            color="#246CC6"
            height={100}
            width={100}
            timeout={3000}
          />
        ) : (
          <>
            <Profile />
            <Contacts />
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
