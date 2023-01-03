import React from "react";
import axios from 'axios'
import { useContext } from "react";
import { useState } from "react";
import Info from "../components/Info";
import AppContext from "../context";


const delay = (ms) => new Promise((res)=>setTimeout(res, ms))
const Drawer = ({ onClose, items = [], onRemove }) => {

  const {setCartItems,cartItems } = useContext(AppContext);
  const [orderId, setOrderId] = useState(null)
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.post(`https://63813f8f9440b61b0d14b16c.mockapi.io/orders`, {
        item: cartItems
      })
      setOrderId(data.id)
      setIsOrderCompleted(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {     
        const item = cartItems[i];
        await axios.delete(`https://63813f8f9440b61b0d14b16c.mockapi.io/cart/` + item.id)
        await delay(1000)
        
      }
    } catch (error) {
      alert("Не удалось создать заказ :(")
    }
    setIsLoading(false)
  };
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between align-center cu-p">
          Корзина
          <img onClick={onClose} src="assets/x.svg" alt="close" />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="cart-item d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.name}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(item.id)}
                      className="removeBtn"
                      src="assets/cartbtn.svg"
                      alt="remove"
                    />
                  </div>
                );
              })}
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
              <button disabled={isLoading} onClick={() => onClickOrder()} className="greenButton">
                Оформить заказ <img src="assets/arrowbtn.svg" alt="Arow " />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            img={
              isOrderCompleted ? "assets/cardComp.svg" : "assets/box.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
