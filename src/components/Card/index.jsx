import React, { useState } from "react";

import styles from "./Card.module.scss";
import AppContext from "../../context";

import ContentLoader from "react-content-loader";
const Card = ({
  id,
  name,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = React.useContext(AppContext);

  const [favorite, setFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, name, price, imageUrl, parentId: id});
  };

  const onClickFavorite = () => {
    onFavorite({ id, name, price, imageUrl });
    setFavorite(!favorite);
  };

  return (
    <div>
      <div className={styles.card}>
        {loading ? (
          <ContentLoader
            speed={2}
            width={155}
            height={265}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="186" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            {onFavorite && (<div className={styles.favorite} onClick={() => onClickFavorite()}>
              <img
                src={favorite ? "assets/like.svg" : "assets/unLike.svg"}
                alt="like"
              />
            </div>)}

            <img width="100%" height={135} src={imageUrl} alt="none" />
            <h5>{name}</h5>

            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price}руб.</b>
              </div>

              {onPlus &&  <img
                src={isItemAdded(id) ? "assets/addbtn.svg" : "assets/btn+.svg"}
                alt="none"
                onClick={() => onClickPlus(isItemAdded(id))}
              />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
