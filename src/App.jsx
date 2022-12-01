import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import "./index.scss";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [cartOpene, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    // fetch("https://63813f8f9440b61b0d14b16c.mockapi.io/items").then(res=>{
    //   return res.json()
    // }).then(json =>{
    //   setItems(json)
    // })
    axios
      .get("https://63813f8f9440b61b0d14b16c.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://63813f8f9440b61b0d14b16c.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://63813f8f9440b61b0d14b16c.mockapi.io/favorites")
      .then((res) => {
        setFavorite(res.data);
      });
  }, []);

  const onAddToCart = async (obj) => {
    console.log(obj);
    try {
      if(cartItems.find((item)=>item.id === obj.id)){
        setCartItems(prev=> prev.filter(element => element.id !== obj.id))
      }else{
        axios.post("https://63813f8f9440b61b0d14b16c.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    
    } catch (error) {
      alert('Ошибка про добавлении товара в корзину')
      console.log(error);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63813f8f9440b61b0d14b16c.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    
  };

  const onAddToFavorite = async (obj) => {
    try {
      if(favorite.find(item => item.id === obj.id)){
        axios.delete(`https://63813f8f9440b61b0d14b16c.mockapi.io/favorites/${obj.id}`)
        setFavorite((prev)=>prev.filter((item)=> item.id !== obj.id))
      }else{
        const {data} = await axios.post("https://63813f8f9440b61b0d14b16c.mockapi.io/favorites", obj);
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
        alert('Не удалось добавить в фавориты')
        console.log(error);
    }
   
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
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
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorite} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}
export default App;
