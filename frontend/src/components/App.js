import React, { Component, useState } from "react";
import { render } from "react-dom";
import Form from "./Form";
import Graph from "./Graph";


function App() {
  const [inputs, setInputs] = useState({
    amplitude: 10,
    frequence: 10,
    temps: 10
  })

  const applyInputs = (newInputs) => {
    setInputs(newInputs)
  }

  return (
    <div>
      <Form applyInputs={applyInputs}/>
      <Graph inputs={inputs}/>
    </div>
  );
}

export default App;

const container = document.getElementById("app");
render(<App />, container);