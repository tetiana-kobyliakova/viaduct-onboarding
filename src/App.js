import React from "react";
import "./App.css";
import Container from "./components/Container";
import Widget from "./components/photo-widget";
import ColorArray from "./components/color-array";
import ZoomWidget from "./components/zoom-widget";
import UsersList from "./components/users-list";

function App() {
  return (
    <Container>
      <UsersList />
      {/* <ColorArray /> */}
      {/* <ZoomWidget /> */}
      {/* <Widget /> */}
    </Container>
  );
}

export default App;
