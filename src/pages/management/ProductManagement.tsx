import React, { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/products.scss"; // import products.scss
import "../../styles/app.scss"; // import app.scss

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const [name, setName] = useState<string>("Puma Shoes");
  const [price, setPrice] = useState<number>(2000);
  const [stock, setStock] = useState<number>(10);
  const [photo, setPhoto] = useState<string>(img);

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhotoUpdate(reader.result);
        // setPhoto(reader.result as string); // Set the photo state to the file's data URL
      };
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID- hjhkj</strong>
          <img src={photo} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h3>${price}</h3>
        </section>
        <article>
          <form onSubmit={submitHandler}>
            <h2>Manage Product</h2>
            <div>
              <label>Product Name:</label>
              <input
                required
                type="text"
                placeholder="Product Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Product Name:</label>
              <input
                required
                type="number"
                placeholder="Product Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Product Stock:</label>
              <input
                required
                type="number"
                placeholder="Product Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Product Photo:</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>
            {/* {photo && <img src="{photo} " alt="Product Photo" />} */}
            {photoUpdate && (
              <img
                src={photoUpdate}
                alt="Product Photo"
                style={{ width: "200px", height: "auto" }}
              />
            )}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

// export default NewProduct;

export default ProductManagement;
