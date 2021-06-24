import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Shoes from "./components/Shoes";
import Hats from "./components/Hats";
import Accessories from "./components/Accessories";
import Main from "./components/Main"
import Footer from "./components/Footer";
import Pages from "./components/Pages"

// import {
//   Header, 
//   Home,
//   Shoes,
//   Hats,
//   Accessories,
//   Main,
//   Footer,
//   Pages
// } from './components'

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
