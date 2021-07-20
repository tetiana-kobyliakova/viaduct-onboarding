import React from "react";
import "./App.css";
import Container from "./components/Container";
import Widget from "./components/photo-widget";
import ZoomWidget from "./components/zoom-widget";

function App() {
  return (
    <Container>
      <h1>Widget</h1>
      <ZoomWidget />
      {/* <Widget /> */}
    </Container>
  );
}

export default App;
