import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./hooks/useCart";
// import AppContext from "../context";
const Header = ({ onClickCard }) => {
  // const { cartItems } = useContext(AppContext);
  // const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const {totalPrice} = useCart()

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img
            className="logo mr-15"
            width={40}
            height={40}
            src={"assets/logo.png"}
            alt="none"
          />

          <div>
            <h3 className="text-uppercase">React sneakers</h3>
            <p className="opacity-5">Магазин лучших крoссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={onClickCard}>
          <img
            className="img_header"
            style={{ marginRight: "10px" }}
            width={18}
            height={18}
            src={"assets/card.png"}
            alt="none"
          />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img
              className="mr-20 cu-p"
              width={18}
              height={18}
              src={"assets/favorite.svg"}
              alt="Закладки"
            />
          </Link>
        </li>
        <li>
          <Link to={"/orders"}>
          <img width={18} height={18} src={"assets/user.svg"} alt="Пользователь" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
