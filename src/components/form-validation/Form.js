import React from "react";
import styles from "./Form.module.css";
import ErrorName from "./ErrorName";
import ErrorAmount from "./ErrorAmount";

const Form = () => {
  const [name, setName] = React.useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const [amount, setAmount] = React.useState("");
  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const [nameError, setNameError] = React.useState("");

  const validateName = (name) => {
    if (name.length < 3) {
      setNameError("Length of name should be greater than 2 characters");
      setName("");
      setAmount("");
      return false;
    }
    setNameError("");
    return true;
  };

  const [amountError, setAmountError] = React.useState("");
  const validateAmount = (amount) => {
    if (isNaN(amount)) {
      setAmountError("Only numbers are allowed");
      setName("");
      setAmount("");
      return false;
    }
    if (amount < 1000) {
      setAmountError("Amount should be greater than or equal to 1000");
      setName("");
      setAmount("");
      return false;
    }
    setAmountError("");
    return true;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const nameIsValid = validateName(name);
    const amountIsValid = validateAmount(amount);
    if (nameIsValid && amountIsValid) {
      console.log("Form was submitted");
      console.log({ name, amount });
      setName("");
      setAmount("");
      setNameError("");
      setAmountError("");
    } else {
      console.log("An error has occurred");
    }
  };

  return (
    <>
      <h1>Form</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmitForm}>
          <div className={styles.block}>
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={onChangeName}
            ></input>
          </div>
          {nameError && <ErrorName error={nameError} />}
          <div className={styles.block}>
            <label htmlFor="amount">Amount: </label>
            <input
              id="amount"
              type="text"
              name="amount"
              value={amount}
              onChange={onChangeAmount}
            ></input>
          </div>
          {amountError && <ErrorAmount error={amountError} />}
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
