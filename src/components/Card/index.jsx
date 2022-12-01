import React, { useState } from "react";
import styles from "./Card.module.scss"
const Card = ({id, name, price, imageUrl, onFavorite, onPlus, favorited = false, added = false}) => {
   const [isAdded, setIsAdded] = useState(added)
   const [favorite, setFavorite] = useState(favorited)
   const onClickPlus = () =>{
    setIsAdded(!isAdded)
    onPlus({id, name, price, imageUrl})
   }

   const onClickFavorite = () =>{
    onFavorite({id, name, price, imageUrl})
    setFavorite(!favorite)
   }

  return (
    <div>
      <div className={styles.card}>
        <div  className={styles.favorite} onClick={()=>onClickFavorite()}>
          <img src={favorite ? "assets/like.svg" : "assets/unLike.svg"} alt="like" />
        </div>

        <img width={133} height={112} src={imageUrl} alt="none" />
        <h5>{name}</h5>

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
