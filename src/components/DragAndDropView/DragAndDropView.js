import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./DragAndDropView.css";
import products from "../../data/products.json";
import draggableProducts from "../../data/draggableProducts.json";

// a function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle,
// });

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

class DragAndDropView extends Component {
  state = {
    items: products,
    selected: draggableProducts,
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd} className="container">
        <div className="container">
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="left-container"
              >
                <div className="left-container-card">
                  <div className="left-container-card-item">ID</div>
                  <div className="left-container-card-item">Name</div>
                </div>
                {this.state.items.map((item, index) => (
                  <Draggable
                    key={item.ProductID}
                    draggableId={item.ProductID.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="left-container-card"
                      >
                        <div className="left-container-card-item">
                          {item.ProductID}
                        </div>
                        <div className="left-container-card-item">
                          {item.ProductName}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="right-container"
              >
                <div className="right-container-card">
                  <div className="right-container-card-item">ID</div>
                  <div className="right-container-card-item">Name</div>
                  <div className="right-container-card-item">Category</div>
                  <div className="right-container-card-item">Price</div>
                  <div className="right-container-card-item">Stock</div>
                  <div className="right-container-card-item">Order</div>
                </div>
                {this.state.selected.map((item, index) => (
                  <Draggable
                    key={item.ProductID}
                    draggableId={item.ProductID.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="right-container-card"
                      >
                        <div className="right-container-card-item">
                          {item.ProductID}
                        </div>
                        <div className="right-container-card-item">
                          {item.ProductName}
                        </div>
                        <div className="right-container-card-item">
                          {item.Category.CategoryName}
                        </div>
                        <div className="right-container-card-item">
                          {item.UnitPrice}
                        </div>
                        <div className="right-container-card-item">
                          {item.UnitsInStock}
                        </div>
                        <div className="right-container-card-item">
                          {item.UnitsOnOrder}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

export default DragAndDropView;
