import React from "react";
import "./App.css";
import Container from "./components/Container";
import Widget from "./components/photo-widget";
import ColorArray from "./components/color-array";

function App() {
  return (
    <Container>
      <h1>Color array</h1>
      <ColorArray />
    </Container>
  );
}

export default App;
