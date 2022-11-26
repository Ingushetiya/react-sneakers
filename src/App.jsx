import { useState } from "react";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import "./index.scss";
// https://63813f8f9440b61b0d14b16c.mockapi.io/items


function App() {
  const [items, setItems] = useState([])
  const [cartOpene, setCartOpened] = useState(false)
  fetch("https://63813f8f9440b61b0d14b16c.mockapi.io/items").then(res=>{
    return res.json()
  }).then(json =>{
    //setItems(json)
  })

  return (
    <div className="wrapper clear">
      {cartOpene && <Drawer onClose ={()=>setCartOpened(false)} />}

      <Header onClickCard ={()=>setCartOpened(true)}/>
      <div className="content p-40">
        <div className="d-flex justify-between mb-40">
          <h1 className="">Все крассовки</h1>
          <div className="search-block d-flex">
            <img src="assets/Search.svg" alt="Search" />
            <input placeholder="Поиск..." type="text" />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map(item =>{
            return(
              <Card 
              
              title = {item.name} 
              price = {item.price}
              imageUrl= {item.imageUrl}

              
              />
            )
          })}
         
        </div>
      </div>
    </div>
  );
}
export default App;
