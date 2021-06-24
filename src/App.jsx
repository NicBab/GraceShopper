import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";


import {
  Header, 
  Home,
  Shoes,
  Hats,
  Accessories,
  Main,
  Footer
} from './components'

function App() {
  return (
      <>
        <Header />
            <Switch>
                  <Route path="/Home">
                    <Home />
                  </Route>

                  <Route path="/Shoes">
                    <Shoes />
                  </Route>

                  <Route path="/Hats">
                    <Hats />
                  </Route>

                  <Route path="/Accessories">
                    <Accessories />
                  </Route>
              </Switch>
          <Main />
          <Footer />
        </>
  );
}

export default App;
