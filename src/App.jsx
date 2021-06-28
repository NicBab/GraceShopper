import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllProducts, getAllUsers, getUserCart } from "./api";
import { Header, Pages } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCart, setUserCart] = useState({});

  const handleAddToCart = async (productId, qty) => {
    
  }

  useEffect(() => {
    getUserCart()
      .then((response) => {
        setUserCart(response);
        console.log(response);
      })
  }, [])


  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response);
        console.log(response);
      })
      .catch((error) => {
        console.error(error)
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
        <Pages users={users} products={products} setProducts={setProducts} onAddToCart={handleAddToCart} />
      </main>
    </>
  );
}

export default App;
