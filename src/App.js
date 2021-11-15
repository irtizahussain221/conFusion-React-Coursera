import React from "react";
import Main from "./components/MainComponent";
// import Menu from "./components/menuComponent";
// import { DISHES } from "./shared/dishes";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <Menu dishes={DISHES} /> */}
        <Main />
      </div>
    );
  }
}

export default App;
