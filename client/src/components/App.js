import React from "react";
import "../styles/App.css";
import { BrowserRouter } from "react-router-dom";
import Links from "./Links";
import CustomRouter from "./Router";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h1 className="title">NOTES</h1>
        <BrowserRouter>
          <Links />
          <CustomRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
