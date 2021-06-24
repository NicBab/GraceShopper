import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import {
  Header, 
  Home,
  Shoes,
  Hats,
  Accessories,
  Main,
  Footer
} from '../Components'

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
