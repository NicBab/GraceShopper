import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllProducts, getAllUsers, getUserCart } from "./api";
import { Header, Pages, Footer } from "./components";
import { useAuth } from './contexts/AuthContext'


function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCart, setUserCart] = useState({});
  const [currentUser, setCurrentUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const {logout} = useAuth();
  const [cart, setCart] = useState([]);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const handleAddToCart = async (product_id, qty) => {};

  // useEffect(() => {
  //   getUserCart().then((response) => {
  //     setUserCart(response);
  //   });
  // }, []);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response);
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


  const addToCart = (product) => {
    console.log('We are adding to the cart')
    setCart([...cart, {...product}])
  }

  const onAdd = (product) => {
    const exists = cartItems.find(x => x.id === product.id);
    if(exists){
      setCartItems(cartItems.map(x => x.id === product.id ? {...exists, qty: exists.qty +1} : x )
      )

    }else {
      setCartItems([...cartItems, {...product, qty: 1}])
    }
  }
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
          onAdd={onAdd}
        />
      </header>

      <main>
        <Pages
         cart={cart}
         setCart={setCart}
         userCart={userCart}
         setUserCart={setUserCart}
          users={users}
          products={products}
          setProducts={setProducts}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
          setCartItems={setCartItems}
          addToCart={addToCart}
          onAdd={onAdd}
        />
      </main>
    
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
