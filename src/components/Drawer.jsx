import React from "react";

const Drawer = ({ onClose, items = [], onRemove }) => {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between align-center cu-p">
          Корзина
          <img onClick={onClose} src="assets/x.svg" alt="close" />
        </h2>
        {items.length > 0 ? (
          <div>
                 <div className="items">
            {items?.map((item) => {
              return (
                <div key={item.id} className="cart-item d-flex align-center mb-20">
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
              <button className="greenButton">
                Оформить заказ <img src="assets/arrowbtn.svg" alt="Arow " />
              </button>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column">
            <img
              className="mb-20"
              height={120}
              width={120}
              src="/assets/box.jpg"
              alt="box"
            />
            <h2>Пустая корзина</h2>
            <p className="opacity-6">
              Добавьте хотябы одну пару крассовок чтобы сделать зака
            </p>
            <button onClick={onClose} className="greenButton">
              <img  src="assets/arrowbtn.svg" alt="111" />
              Вернуться назад
            </button>
          </div>
        )}

    
      </div>
    </div>
  );
};

export default Drawer;
