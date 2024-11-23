import React from "react";
import TableHOC from "./TableHOC";
import { Column } from "react-table";

// Define an interface for the row data structure
interface DataTypes {
  id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<DataTypes>[] = [
  {
    // Define the columns for the table
    // Each column is an object with 'Header' and 'accessor' properties
    // 'Header' is the text to be displayed as the column header
    // 'accessor' is the key of the data object that this column corresponds to
    // Column for 'Name'
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const DashboardTable = ({ data = [] }: { data: DataTypes[] }) => {
  return TableHOC<DataTypes>(
    columns,
    data,
    "dashboard-product-box",
    "Recent Orders",
    true
  )();
};

export default DashboardTable;
