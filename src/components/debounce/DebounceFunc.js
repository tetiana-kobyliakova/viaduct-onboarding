import React from "react";
import styles from "./Debounce.module.css";
import debounce from "lodash/debounce";

const searchRequest = (searchQuery) =>
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then((res) => res.json())
    .then((res) => res);

const DebounceFunc = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleResult = React.useCallback(
    debounce((i) => {
      if (!i) {
        setCountries([]);
        return;
      }
      setLoading(true);
      searchRequest(i)
        .then(setCountries)
        .catch((err) => {
          console.log(err);
        })
        .finally(setLoading(false));
    }, 500),
    []
  );
  console.log(loading);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  React.useEffect(() => handleResult(inputValue), [inputValue]);
  console.log(countries);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Functional component</h2>
      {loading && <p>Loading...</p>}
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />

      {countries?.status === 404 ? (
        <p className={styles.notFound}>Not Found</p>
      ) : (
        <ul className={styles.countryList}>
          {countries &&
            countries.map((country) => (
              <li key={country.name}>{country.name}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DebounceFunc;
