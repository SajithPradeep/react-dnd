import React from "react";

import "./DraggableList.css";

const DraggableList = (props) => {
  return (
    <div className="draggable-list">
      <h2>Draggable List</h2>
      <div className="card card-heading">
        <div className="card-id">ID</div>
        <div className="card-name">Product Name</div>
      </div>
      {props.products.map((product) => {
        return (
          <div
            className="card"
            key={product.ProductID}
            onClick={() => props.clickHandler(product)}
          >
            <div className="card-id">{product.ProductID}</div>
            <div className="card-name">{product.ProductName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DraggableList;
