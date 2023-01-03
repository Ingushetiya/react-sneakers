import React from "react";

import Card from "../components/Card";
const Home = ({
  id,
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const renderItem = () => {
    const filteredItem = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItem).map((item, index) => {
      return (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          {...item}
          loading={isLoading}
        />
      );
    });
  };
  return (
    <div className="content p-40">
      <div className="d-flex justify-between mb-40">
        <h1 className="">
          {searchValue
            ? `Поиск по запросу:  "${searchValue}"`
            : "Все крoссовки"}
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

      <div className="d-flex flex-wrap">{renderItem()}</div>
    </div>
  );
};

export default Home;
