import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import "./index.scss";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
//React-sneakers


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [cartOpene, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        "https://63813f8f9440b61b0d14b16c.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://63813f8f9440b61b0d14b16c.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://63813f8f9440b61b0d14b16c.mockapi.io/items"
      );

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorite(favoritesResponse.data);
      setItems(itemsResponse.data);
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

  const onRemoveItem = (id) => {
    axios.delete(`https://63813f8f9440b61b0d14b16c.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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

  const isItemAdded = (id) =>{
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }
  return (
    <div className="wrapper clear">
      <AppContext.Provider  value={{items, cartItems, favorite, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
        {cartOpene && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

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
          <Route
            path="/favorites" exact
            element={
              <Favorites/>
            }
          />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}
export default App;
