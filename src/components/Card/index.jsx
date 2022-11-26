import React, { useState } from "react";
import styles from "./Card.module.scss"
const Card = ({title, price, imageUrl, onClickFavorite}) => {
   const [isAdded, setIsAdded] = useState(false)
   const onClickAdd = () =>{
    setIsAdded(!isAdded)
   }
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.favorite} onClick={()=>onClickFavorite()}>
          <img src="assets/unLike.svg" alt="like" />
        </div>

        <img width={133} height={112} src={imageUrl} alt="none" />
        <h5>{title}</h5>

        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price}руб.</b>
          </div>
          
            <img src={!isAdded?"assets/btn+.svg":"assets/addbtn.svg"} alt="none" onClick={()=>onClickAdd()}/>
          
        </div>
      </div>
    </div>
  );
};

export default Card;
