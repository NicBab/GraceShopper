import React from 'react';
import './App.css';

import {
  Header,  
  Pages
} from './components'

function App() {
  return (
    <>
      <header>
        <Header />  
      </header>

      <main>
        <Pages />
      </main>
    </>
  );
}

export default App;
