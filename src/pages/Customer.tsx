import React, { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/app.scss";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import { FaTrash } from "react-icons/fa";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    // Define the columns for the table
    // Each column is an object with 'Header' and 'accessor' properties
    // 'Header' is the text to be displayed as the column header
    // 'accessor' is the key of the data object that this column corresponds to
    // Column for 'Name'
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const arr: DataType[] = [
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/men/1.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Male",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/women/2.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "Jane Smith",
    email: "janesmith@example.com",
    gender: "Female",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/men/3.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "Michael Johnson",
    email: "michaeljohnson@example.com",
    gender: "Male",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/women/4.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "Emily Brown",
    email: "emilybrown@example.com",
    gender: "Female",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/men/5.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "David Wilson",
    email: "davidwilson@example.com",
    gender: "Male",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/women/6.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "Sarah Martinez",
    email: "sarahmartinez@example.com",
    gender: "Female",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/men/7.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "Christopher Lee",
    email: "christopherlee@example.com",
    gender: "Male",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/women/8.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "Jessica Taylor",
    email: "jessicataylor@example.com",
    gender: "Female",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/men/9.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "Kevin Clark",
    email: "kevinclark@example.com",
    gender: "Male",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        src="https://randomuser.me/api/portraits/women/10.jpg"
        alt="Avatar"
        style={{ borderRadius: "50%" }}
      />
    ),
    name: "Amanda Adams",
    email: "amandaadams@example.com",
    gender: "Female",
    role: "User",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const Customer = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC(
      columns,
      arr,
      "product-container", // containerClassname
      "Customers", // heading
      true // showPagination
    ),
    []
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
    </div>
  );
};

export default Customer;
