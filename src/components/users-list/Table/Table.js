import React from "react";
import styles from "./Table.module.css";

const Table = ({ sortedUsers }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>ip Address</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.ipAddress}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
