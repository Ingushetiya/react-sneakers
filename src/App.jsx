import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import "./index.scss";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";
//Project

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [cartOpene, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
            const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
              axios.get(
                "https://63813f8f9440b61b0d14b16c.mockapi.io/cart"
              ),
              axios.get(
                "https://63813f8f9440b61b0d14b16c.mockapi.io/favorites"
              ),
              axios.get(
                "https://63813f8f9440b61b0d14b16c.mockapi.io/items"
              )
            ])   
          setIsLoading(false);    
          setCartItems(cartResponse.data);
          setFavorite(favoritesResponse.data);
          setItems(itemsResponse.data);
        }
       catch (error) {
        console.error(error);
        alert('Ошибка при запросе данных :(')
      }
      } 
     fetchData();
  }, []);
  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://63813f8f9440b61b0d14b16c.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((element) => Number(element.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://63813f8f9440b61b0d14b16c.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Ошибка про добавлении товара в корзину");
      console.log(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://63813f8f9440b61b0d14b16c.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Ошибка при удалении товара из корзины')
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorite.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://63813f8f9440b61b0d14b16c.mockapi.io/favorites/${obj.id}`
        );
        setFavorite((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://63813f8f9440b61b0d14b16c.mockapi.io/favorites",
          obj
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.log(error);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };
  return (
    <div className="wrapper clear">
      <AppContext.Provider
        value={{
          items,
          cartItems,
          favorite,
          isItemAdded,
          onAddToFavorite,
          onAddToCart,
          setCartOpened,
          setCartItems
        }}
      >
        {/* {cartOpene && (
        
        )} */}
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
            opened = {cartOpene}
          />

        <Header onClickCard={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" exact element={<Favorites />} />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}
export default App;
