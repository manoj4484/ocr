import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyNavbar from "./layout/MyNavbar";
import OcrScanner from "./pages/OcrScanner";
import AboutUs from "./pages/AboutUs";
import Landing from "./pages/Landing";
import Recommender from "./pages/Recommender";

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/food-recommender" component={Recommender} />
        <Route exact path="/scan" component={OcrScanner} />
      </Switch>
    </Router>
  );
};

export default App;
