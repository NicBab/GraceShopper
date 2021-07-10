import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllProducts, getAllUsers, getCart } from "./api";
import { Header, Pages, Footer } from "./components";
import { useAuth } from './contexts/AuthContext'

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const {logout} = useAuth();

  useEffect(() => {
    getAllProducts()
      .then(({products}) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
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

  useEffect(() => {
    async function fetchCart() {
      const userCart = await getCart();
      setCart(userCart);
      console.log(userCart, "*****userCart in useEffect (App)*****");
    }
    fetchCart();
  }, []);

  return (
    <>
      <header>
        <Header
          admin={admin}
          setAdmin={setAdmin}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          logout={logout}
          cart={cart}
          setCart={setCart}
        />
      </header>

      <main>
        <Pages
          cart={cart}
          setCart={setCart}
          users={users}
          products={products}
          setProducts={setProducts}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </main>
    
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
