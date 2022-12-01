import React, { useState } from "react";
import styles from "./Card.module.scss"
const Card = ({id, title, price, imageUrl, onFavorite, onPlus, favorited = false}) => {
   const [isAdded, setIsAdded] = useState(false)
   const [favorite, setFavorite] = useState(favorited)
   const onClickPlus = () =>{
    setIsAdded(!isAdded)
    onPlus({id, title, price, imageUrl})
   }

   const onClickFavorite = () =>{
    onFavorite({id, title, price, imageUrl})
    setFavorite(!favorite)
   }

  return (
    <div>
      <div className={styles.card}>
        <div  className={styles.favorite} onClick={()=>onClickFavorite()}>
          <img src={favorite ? "assets/like.svg" : "assets/unLike.svg"} alt="like" />
        </div>

        <img width={133} height={112} src={imageUrl} alt="none" />
        <h5>{title}</h5>

        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price}руб.</b>
          </div>
          
            <img 
            src={!isAdded?"assets/btn+.svg":"assets/addbtn.svg"} 
            alt="none" 
            onClick={()=>onClickPlus()}/>
          
        </div>
      </div>
    </div>
  );
};

export default Card;
