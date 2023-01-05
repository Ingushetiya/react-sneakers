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
        const [cartResponse, favoritesResponse, itemsResponse] =
        //запросы для получения товара на mockapi
          await Promise.all([
            axios.get("https://63813f8f9440b61b0d14b16c.mockapi.io/cart"),
            axios.get("https://63813f8f9440b61b0d14b16c.mockapi.io/favorites"),
            axios.get("https://63813f8f9440b61b0d14b16c.mockapi.io/items"),
          ]);
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorite(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error(error);
        alert("Ошибка при запросе данных :(");
      }
    }
    fetchData();
  }, []);
  // Добавление товаров в корзину
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.id) === Number(obj.id))
      if (findItem) {
        
        setCartItems((prev) =>
          prev.filter((element) => Number(element.parentId) !== Number(obj.id))
        );

        await axios.delete(
          `https://63813f8f9440b61b0d14b16c.mockapi.io/cart/${findItem.id}`
        );

      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post("https://63813f8f9440b61b0d14b16c.mockapi.io/cart", obj);
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId){
            return{
              ...item, 
              id: data.id
            }
          }
          return item
        }));
      }
    } catch (error) {
      alert("Ошибка про добавлении товара в корзину");
      console.log(error);
    }
  };

  //Удаление товара из корзины
  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(id)));
      await axios.delete(
        `https://63813f8f9440b61b0d14b16c.mockapi.io/cart/${id}`
      );
      
    } catch (error) {
      alert("Ошибка при удалении товара из корзины");
      console.error(error);
    }
  };
  // Добавление товара в избранное
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
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
          setCartItems,
        }}
      >
        {/* {cartOpene && (
        
        )} */}
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpene}
        />

        <Header onClickCard={() => setCartOpened(true)} />

        <Routes>
          <Route
            path=""
            element={
              <Home
              //прорсы 
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
          <Route path="favorites" exact element={<Favorites />} />
          <Route path="orders" exact element={<Orders />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}
export default App;
