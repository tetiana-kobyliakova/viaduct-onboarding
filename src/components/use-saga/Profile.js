import React from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { profileSelector } from "../../reducers/profile";

const Profile = () => {
  const { profile, error } = useSelector(profileSelector);
  return (
    <div className={styles.profile}>
      {profile && <h2 className={styles.title}>Profile</h2>}
      {error && <p className={styles.error}>Something went wrong</p>}
      {profile && (
        <div>
          <img
            className={styles.image}
            src={profile.picture.large}
            alt="user"
          />
          <div className={styles.profileInfo}>
            <p
              className={styles.info}
              style={{ textAlign: "center", fontWeight: "bold" }}
            >{`${profile.name.title} ${profile.name.first} ${profile.name.last}`}</p>
            <p className={styles.info}>
              <strong>gender:</strong> {profile.gender}
            </p>
            <p className={styles.info}>
              <strong>country:</strong> {profile.location.country}
            </p>
            <p className={styles.info}>
              <strong>email:</strong> {profile.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
