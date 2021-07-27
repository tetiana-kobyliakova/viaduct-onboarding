import React from "react";
import usersData from "./support.json";
import styles from "./NestedList.module.css";

const NestedList = () => {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => setUsers(usersData), []);
  return (
    <>
      <h1>Nested list</h1>
      <Table usersList={users} />
    </>
  );
};

const Table = ({ usersList }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => {
          return <Row user={user} key={user.id} nested={0} />;
        })}
      </tbody>
    </table>
  );
};

const Row = ({ user, nested }) => {
  let children = null;
  if (user.referralsCount > 0) {
    children = (
      <>
        {user.referrals.map((i) => (
          <Row user={i} key={i.id} nested={nested + 1} />
        ))}
      </>
    );
  }
  return (
    <>
      <tr key={user.id}>
        {nested === 1 ? (
          <td style={{ color: "red", paddingLeft: "20px" }}>{user.id}</td>
        ) : nested === 2 ? (
          <td style={{ color: "green", paddingLeft: "40px" }}>{user.id}</td>
        ) : (
          <td>{user.id}</td>
        )}
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.website}</td>
        <td>{user.company.name}</td>
      </tr>
      {children}
    </>
  );
};

export default NestedList;
