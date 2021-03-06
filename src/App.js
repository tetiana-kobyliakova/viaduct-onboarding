import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Navigation from "./components/navigation";
import Container from "./components/Container";
import PhotoWidget from "./components/photo-widget";
import ColorArray from "./components/color-array";
import ZoomWidget from "./components/zoom-widget";
import UsersList from "./components/users-list";
import Slider from "./components/slider";
import Form2 from "./components/form-validation2";
import Tabs from "./components/tabs";
import Pagination from "./components/pagination";
import DropDown from "./components/drop-down/DropDown";
import Debounce from "./components/debounce";
import TimeComponent from "./components/hoc/TimeComponent";
import MultiStepForm from "./components/multi-step-form/Form2";
import Transition from "./components/transition";
import UserPage from "./components/use-saga";

function App() {
  return (
    <div className={styles.container}>
      <Navigation />
      <Container>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <>
                <h1>This is Home Page</h1>
                <p style={{ fontSize: "18px", textAlign: "center" }}>
                  Take a look at my front-end practice
                </p>
              </>
            )}
          />
          <Route path="/pagination/:page" component={Pagination} />
          <Route path="/pagination" component={Pagination} />
          <Route path="/slider" component={Slider} />
          <Route path="/user-list" component={UsersList} />
          <Route path="/form-validation" component={Form2} />
          <Route path="/tabs" component={Tabs} />
          <Route path="/zoom-widget" component={ZoomWidget} />
          <Route path="/photo-widget" component={PhotoWidget} />
          <Route path="/color-array" component={ColorArray} />
          <Route path="/dropdown-menu" component={DropDown} />
          <Route path="/debounce" component={Debounce} />
          <Route
            path="/hoc"
            render={() => <TimeComponent title={"Time Component"} />}
          />
          <Route path="/multi-step-form" component={MultiStepForm} />
          <Route path="/transition" component={Transition} />
          <Route path="/saga" component={UserPage} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
