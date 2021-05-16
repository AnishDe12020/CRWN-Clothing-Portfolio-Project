import React from 'react'
import { Route, Switch   } from "react-router-dom" 

import './App.css'

import HomePage from "./pages/homepages/homepage.component"

const HatsPage = () => {
  return (
    <div>
      <h1>Hats Page</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App
