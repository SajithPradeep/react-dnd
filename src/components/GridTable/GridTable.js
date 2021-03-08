import React, { useState } from "react";

import "./GridTable.css";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const GridTable = (props) => {
  return (
    <Grid
      style={{
        minHeight: "200px",
        border: "1px solid",
        textAlign: "center",
      }}
      data={props.products}
    >
      <Column field="ProductID" title="ID" width="50px" />
      <Column field="ProductName" title="Name" width="200px" />
      <Column
        field="Category.CategoryName"
        title="Category Name"
        width="100px"
      />
      <Column field="UnitPrice" title="Price" width="100px" />
      <Column field="UnitsInStock" title="In stock" width="100px" />
    </Grid>
  );
};

export default GridTable;
