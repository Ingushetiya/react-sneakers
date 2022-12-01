import React from "react";
import Card from "../components/Card";
const Home = ({id,items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, cartItems}) => {

  return (
    <div className="content p-40">
      <div className="d-flex justify-between mb-40">
        <h1 className="">
          {searchValue
            ? `Поиск по запросу:  "${searchValue}"`
            : "Все крассовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="assets/Search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="assets/x.svg"
              alt="clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
            type="text"
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items.filter((item) =>
        
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          ).map((item, index) => {
            return (
              
              <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                added={cartItems.some(obj =>Number(obj.id) === Number(item.id))}
                {...item}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
