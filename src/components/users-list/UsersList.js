import React from "react";
import userData from "./userData.json";
import styles from "./UsersList.module.css";
import Select from "./Select";
import Table from "./Table";
import Button from "./Button";

const createUsers = () => {
  const keys = Object.keys(userData);
  const users = userData.id.map((item, index) => {
    const obj = {};
    for (const key of keys) {
      obj[key] = userData[key][index];
    }
    return obj;
  });
  return users;
};

const getAllGenders = (arr) => {
  const result = [];
  for (const str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
};

const allGenders = [...getAllGenders(userData.gender), "all"];

const UsersList = () => {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => setUsers(createUsers()), []);

  const [isAscending, setIsAscending] = React.useState(true);

  const [gender, setGender] = React.useState("all");
  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const filteredByGender = React.useMemo(() => {
    if (gender === "all") {
      return users;
    }
    return users.filter((user) => user.gender === gender);
  }, [users, gender]);

  const sortedUsers = React.useMemo(() => {
    if (isAscending) {
      return filteredByGender;
    } else {
      return [...filteredByGender].reverse();
    }
  }, [filteredByGender, isAscending]);

  const changeOrder = () => {
    setIsAscending(!isAscending);
  };
  return (
    <>
      <h1 className={styles.title}>Users list</h1>
      <div className={styles.wrapper}>
        <Button isAscending={isAscending} changeOrder={changeOrder} />
        <Select
          gender={gender}
          onHandleChange={handleChange}
          allGenders={allGenders}
        />
      </div>
      <Table sortedUsers={sortedUsers} />
    </>
  );
};

export default UsersList;
