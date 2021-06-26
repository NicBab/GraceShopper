import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllProducts, getAllUsers } from "./api";
import { Header, Pages } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Pages users={users} products={products} setProducts={setProducts} />
      </main>
    </>
  );
}

export default App;
