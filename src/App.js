import React, { useState } from "react";
import "./App.css";

import products from "./data/products.json";
import draggableProducts from "./data/draggableProducts.json";

import GridTable from "./components/GridTable/GridTable";
import DraggableList from "./components/DraggableList/DraggableList";

function App() {
  const [draggableProductsList] = useState([...draggableProducts]);

  const [productList, setProductList] = useState([...products]);

  const onClickHandler = (product) => {
    setProductList((prevState) => {
      return [...prevState, product];
    });
  };
  return (
    <div className="App">
      <DraggableList
        products={draggableProductsList}
        clickHandler={onClickHandler}
      />
      <GridTable products={productList} />
    </div>
  );
}

export default App;
