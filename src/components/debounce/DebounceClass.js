import React, { Component } from "react";
import styles from "./Debounce.module.css";
import debounce from "lodash/debounce";

class DebounceClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      result: "",
    };
    this.handleResult = this.handleResult.bind(this);
  }

  handleResult = debounce(this.setResult, 500);

  setResult() {
    this.setState({ result: this.state.inputValue });
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
    this.handleResult();
  };

  render() {
    const { inputValue, result } = this.state;

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Class component</h2>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={this.handleInputChange}
        />
        <p className={styles.output}>{result}</p>
      </div>
    );
  }
}

export default DebounceClass;
