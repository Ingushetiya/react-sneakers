import React from "react";

const Header = ({onClickCard}) => {
  return (
    <header className="d-flex justify-between align-center p-40">
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
          <p className="opacity-5">Магазин лучших крассовок</p>
        </div>
      </div>

      <ul className="d-flex">
        <li className="mr-30 cu-p"onClick={onClickCard}>
          <img style={{marginRight:"10px"}} width={18} height={18} src={"assets/card.svg"} alt="none" />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} src={"assets/user.svg"} alt="none" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
