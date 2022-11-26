import React from "react";

const Drawer = ({onClose}) => {
  return (
    <div  className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between align-center cu-p">Корзина
        <img onClick={onClose} src="assets/x.svg" alt="close" />
        </h2>
        <div className="items">
          <div className="cart-item d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(assets/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="assets/cartbtn.svg" alt="remove" />
          </div>
          <div className="cart-item d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(assets/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="assets/cartbtn.svg" alt="remove" />
          </div>
          <div className="cart-item d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(assets/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="assets/cartbtn.svg" alt="remove" />
          </div>
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб. </b>
            </li>
            <li>
              <span>Налог 5%: </span>
              <div></div>
              <b>1074 руб. </b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="assets/arrowbtn.svg" alt="Arow " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
