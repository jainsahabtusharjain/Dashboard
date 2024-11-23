import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/products.scss"; // import products.scss
import "../../styles/app.scss"; // import app.scss
import { OrderItemType, OrderType } from "../../types";
import { Link } from "react-router-dom"; // Import Link here

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    price: 100,
    quantity: 2,
    _id: "fdsfsdfsd",
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Tushar Jain",
    address: "123, ABC Street",
    city: "New York",
    state: "NY",
    country: "India",
    pinCode: 123456,
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "1234567890",
  });
  const {
    name,
    address,
    city,
    state,
    country,
    pinCode,
    status,
    subtotal,
    discount,
    shippingCharges,
    tax,
    total,
  } = order;

  const updateHandler = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section style={{ padding: "2rem" }}>
          <h2>Order Items</h2>
          {order.orderItems.map((i) => (
            <ProductCard
              name={i.name}
              photo={i.photo}
              price={i.price}
              quantity={i.quantity}
              _id={i._id}
            />
          ))}
        </section>
        <article className="shipping-info-card">
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address} ${city}, ${state}, ${country} ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>SubTotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>
          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
                // : status === "Cancelled"
                // ? "red"
                // : "bloodred"
              }
            >
              {status}
            </span>
          </p>
          <button onClick={updateHandler}>Process Status</button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => {
  return (
    <div className="transaction-product-card">
      <img src={photo} alt={name} />
      <Link to={`/product/${_id}`}>{name}</Link>
      <span>
        ${price} x {quantity} = ${price * quantity}
      </span>
    </div>
  );
};

export default TransactionManagement;
