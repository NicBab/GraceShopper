import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllProducts, getAllUsers, getUserCart } from "./api";
import { Header, Pages, Footer } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCart, setUserCart] = useState({});
  const [currentUser, setCurrentUser] = useState()


  const handleAddToCart = async (productId, qty) => {
  }

  useEffect(() => {
    getUserCart()
      .then((response) => {
        setUserCart(response);
      })
  }, [])

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response);
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
        <Header 
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </header>

      <main>
        <Pages 
          // userCart={setUserCart}
          // setUserCart={setUserCart}
          users={users} 
          products={products} 
          setProducts={setProducts} 
          onAddToCart={handleAddToCart} 
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
