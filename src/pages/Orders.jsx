import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import AppContext from "../context";
const Orders = () => {
    const { onAddToFavorite, onAddToCart} = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
       try {
        (async ()=>{
            const {data} =  await axios.get('https://63813f8f9440b61b0d14b16c.mockapi.io/orders')
            // console.log(data.map((item)=> item.item).flat());
            const ordersCart = data.reduce((prev, obj)=>[...prev, ...obj.item],[])
            setOrders(ordersCart);
            setIsLoading(false)
        })()
       } catch (error) {
        alert("Ошибка загрузки заказов")
        console.error(error)
       }
      
    },[])

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)]: orders).map((item, index) => (
          <Card 
          key={index}
          {...item}
          loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
