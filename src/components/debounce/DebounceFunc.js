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
        setLoading(false);
        return;
      }

      setTimeout(() => {
        searchRequest(i)
          .then(setCountries)
          .catch((err) => {
            console.log(err);
          })
          .finally(setLoading(false));
      }, 2000);
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    setLoading(true);
    setInputValue(e.target.value);
  };
  React.useEffect(() => handleResult(inputValue), [inputValue]);
  console.log(loading);
  console.log(countries);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Functional component</h2>

      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      {loading && <p>Loading...</p>}

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
