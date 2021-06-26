import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllProducts } from "./api";
import { Header, Pages } from "./components";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response);
        console.log(response);
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
