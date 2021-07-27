import React from "react";
import styles from "./Form2.module.css";
import Error from "./Error";
const formData = [
  {
    name: "name",
    type: "text",
    validationRules: [(value) => !value, (value) => value.length < 3],
    value: "",
    errors: [
      "Field shouldn't be empty",
      "Length of name should be greater than 2 characters",
    ],
    errorIndex: -1,
  },
  {
    name: "text",
    type: "text",
    validationRules: [(value) => !value, (value) => value.length < 3],
    value: "",
    errors: [
      "Field shouldn't be empty",
      "Length of name should be greater than 2 characters",
    ],
    errorIndex: -1,
  },
  {
    name: "amount",
    type: "text",
    validationRules: [
      (value) => !value,
      (value) => isNaN(value),
      (value) => value < 1000,
    ],
    value: "",
    errors: [
      "Field shouldn't be empty",
      "Only numbers are allowed",
      "Amount should be greater than or equal to 1000",
    ],
    errorIndex: -1,
  },
];
const CallFormState = ({ state = formData }) => {
  const [formState, setFormState] = React.useState(state);
  const successCBSubmitHandler = () => {
    console.log("success", {
      name: formState[0].value,
      amount: formState[1].value,
    });
    setFormState(state);
  };
  return (
    <Form2
      formState={formState}
      setFormState={setFormState}
      successCB={successCBSubmitHandler}
    />
  );
};
const Form2 = ({ formState, setFormState, successCB }) => {
  const onInputChange = (e) => {
    setFormState(
      formState.map((item) => {
        if (item.name === e.target.name) {
          return { ...item, value: e.target.value };
        } else {
          return item;
        }
      })
    );
  };
  const validateForm = () => {
    const newState = formState.map((item, index) => {
      const errorIdx = formState[index].validationRules.findIndex((i) =>
        i(formState[index].value)
      );
      return { ...item, errorIndex: errorIdx };
    });
    return newState;
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const checkFormState = validateForm();
    const isValid = checkFormState.every((item) => item.errorIndex === -1);
    if (isValid) {
      successCB(formState);
    } else {
      console.log("An error has occurred");
      setFormState(checkFormState);
    }
  };

  return (
    <>
      <h1>Form2</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmitForm}>
          {formState.map((item) => {
            return (
              <div key={item.name} className={styles.block}>
                <div>
                  <label htmlFor={item.name}>
                    {item.name[0].toUpperCase() + item.name.slice(1)}:{" "}
                  </label>
                  <input
                    id={item.name}
                    type={item.type}
                    name={item.name}
                    value={item.value}
                    onChange={onInputChange}
                  ></input>
                </div>
                {item.errorIndex !== -1 && (
                  <Error error={item.errors[item.errorIndex]} />
                )}
              </div>
            );
          })}
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default CallFormState;
