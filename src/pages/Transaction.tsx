import React, { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/app.scss";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}
const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const arr: DataType[] = [
  {
    user: "User 1",
    amount: 500,
    discount: 20,
    quantity: 5,
    status: <span style={{ color: "purple" }}>Delivered</span>,
    action: <Link to="/admin/transaction/1">Manage</Link>,
  },
  {
    user: "User 2",
    amount: 700,
    discount: 30,
    quantity: 7,
    status: <span style={{ color: "green" }}>Shipped</span>,
    action: <Link to="/admin/transaction/2">Manage</Link>,
  },
  {
    user: "User 3",
    amount: 300,
    discount: 10,
    quantity: 3,
    status: <span style={{ color: "red" }}>Processing</span>,
    action: <Link to="/admin/transaction/3">Manage</Link>,
  },
  {
    user: "User 4",
    amount: 1000,
    discount: 50,
    quantity: 10,
    status: <span style={{ color: "purple" }}>Delivered</span>,
    action: <Link to="/admin/transaction/4">Manage</Link>,
  },
  {
    user: "User 5",
    amount: 400,
    discount: 15,
    quantity: 4,
    status: <span style={{ color: "purple" }}>Delivered</span>,
    action: <Link to="/admin/transaction/5">Manage</Link>,
  },
  {
    user: "User 6",
    amount: 800,
    discount: 40,
    quantity: 8,
    status: <span style={{ color: "green" }}>Shipped</span>,
    action: <Link to="/admin/transaction/6">Manage</Link>,
  },
  {
    user: "User 7",
    amount: 600,
    discount: 25,
    quantity: 6,
    status: <span style={{ color: "red" }}>Processing</span>,
    action: <Link to="/admin/transaction/7">Manage</Link>,
  },
  {
    user: "User 8",
    amount: 900,
    discount: 45,
    quantity: 9,
    status: <span style={{ color: "green" }}>Shipped</span>,
    action: <Link to="/admin/transaction/8">Manage</Link>,
  },
  {
    user: "User 9",
    amount: 200,
    discount: 5,
    quantity: 2,
    status: <span style={{ color: "red" }}>Processing</span>,
    action: <Link to="/admin/transaction/9">Manage</Link>,
  },
  {
    user: "User 10",
    amount: 1200,
    discount: 60,
    quantity: 12,
    status: <span style={{ color: "red" }}>Processing</span>,
    action: <Link to="/admin/transaction/10">Manage</Link>,
  },
];

const Transaction = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC(columns, data, "product-container", "Transaction", true),
    [data]
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
    </div>
  );
};

export default Transaction;
