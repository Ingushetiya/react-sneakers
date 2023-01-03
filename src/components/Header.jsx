import React from "react";
import { Link } from "react-router-dom";
const Header = ({ onClickCard }) => {
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
            style={{ marginRight: "10px" }}
            width={18}
            height={18}
            src={"assets/card.svg"}
            alt="none"
          />
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img
              className="mr-20 cu-p"
              width={18}
              height={18}
              src={"assets/favorite.svg"}
              alt="none"
            />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src={"assets/user.svg"} alt="none" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
