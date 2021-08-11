import React from "react";
import styles from "./Form2.module.css";
import Error from "./Error";
import Success from "./Success";
const formData1 = [
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
];

const formData2 = [
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

const CallFormState = ({ state1 = formData1, state2 = formData2 }) => {
  const [formState1, setFormState1] = React.useState(state1);
  const [formState2, setFormState2] = React.useState(state2);
  const [step, setStep] = React.useState(1);

  const successCBSubmitHandler = () => {
    console.log(
      "success",
      [...formState1, ...formState2].reduce((acc, item) => {
        acc[item.name] = item.value;
        return acc;
      }, {})
    );
    setFormState1(state1);
    setFormState2(state2);
  };

  const nextStep = () => {
    setStep((s) => s + 1);
  };
  switch (step) {
    case 1:
      return (
        <Form
          formState={formState1}
          setFormState={setFormState1}
          // successCB={successCBSubmitHandler}
          nextStep={nextStep}
          step={step}
        />
      );
    case 2:
      return (
        <Form
          formState={formState2}
          setFormState={setFormState2}
          successCB={successCBSubmitHandler}
          nextStep={nextStep}
          step={step}
        />
      );
    case 3:
      return <Success />;
    default:
      console.log("This is a multi-step form");
  }
};
const Form = ({ formState, setFormState, successCB, step, nextStep }) => {
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
    if (isValid && step < 2) {
      nextStep();
    } else if (isValid && step === 2) {
      successCB(formState);
      nextStep();
    } else {
      console.log("An error has occurred");
      setFormState(checkFormState);
    }
  };

  return (
    <>
      <h1>Step {step}</h1>
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
            Next
          </button>
        </form>
      </div>
    </>
  );
};
export default CallFormState;
