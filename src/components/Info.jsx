import React from 'react';
import AppContext from '../context';

const Info = ({title, description, img}) => {
    const {setCartOpened} = React.useContext(AppContext)
    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column">
            <img
              className="mb-20"
              height={120}
              width={120}
              src={img}
              alt="box"
            />
            <h2>{title}</h2>
            <p className="opacity-6">
              {description}
            </p>
            <button onClick={()=>setCartOpened(false)} className="greenButton">
              <img src="assets/arrowbtn.svg" alt="111" />
              Вернуться назад
            </button>
          </div>
    );
};

export default Info;