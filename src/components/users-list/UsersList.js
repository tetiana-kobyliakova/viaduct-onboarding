import React from "react";
import userData from "./userData.json";
import styles from "./UsersList.module.css";
import Select from "./Select";
import Table from "./Table";
import Button from "./Button";

const createUsers = () => {
  const keys = Object.keys(userData);
  const users = userData.id.reduce((acc, _, index) => {
    const obj = keys.reduce((acc, key) => {
      acc[key] = userData[key][index];
      return acc;
    }, {});
    acc.push(obj);
    return acc;
  }, []);
  return users;
};

const allGenders = [...new Set(userData.gender), "all"];

const UsersList = () => {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => setUsers(createUsers()), []);
  console.log(users);

  const [isAscending, setIsAscending] = React.useState(true);

  const [gender, setGender] = React.useState("all");
  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const [lastName, setLastName] = React.useState("");
  const onInputChange = (e) => {
    setLastName(e.target.value);
  };

  const filtered = React.useMemo(() => {
    if (gender === "all" && !lastName) {
      return users;
    }
    const filter = lastName.toLowerCase();

    return users.filter((user) => {
      const isGenderValid = gender === "all" || user.gender === gender;
      const userIncludesFilter =
        !lastName || user.lastName.toLowerCase().includes(filter);

      return isGenderValid && userIncludesFilter;
    });
  }, [users, gender, lastName]);

  const sortedUsers = React.useMemo(() => {
    if (isAscending) {
      return filtered;
    } else {
      return [...filtered].reverse();
    }
  }, [filtered, isAscending]);

  const changeOrder = () => {
    setIsAscending(!isAscending);
  };
  return (
    <>
      <h1>Users list</h1>
      <div className={styles.wrapper}>
        <Button isAscending={isAscending} changeOrder={changeOrder} />
        <div>
          <label htmlFor="lastNameInput">Search by last name</label>
          <input
            id="lastNameInput"
            className={styles.lastNameInput}
            value={lastName}
            onChange={onInputChange}
            // onBlur={() => setLastName("")}
          />
          <button className={styles.clear} onClick={() => setLastName("")}>
            clear
          </button>
        </div>
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
