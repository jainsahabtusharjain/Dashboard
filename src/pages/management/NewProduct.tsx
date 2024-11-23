import React, { ChangeEvent, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/products.scss"; // import products.scss
import "../../styles/app.scss"; // import app.scss
const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photo, setPhoto] = useState<string>("");

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhoto(reader.result);
        // setPhoto(reader.result as string); // Set the photo state to the file's data URL
      };
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form>
            <h2>New Product</h2>
            <div>
              <label>Product Name:</label>
              <input
                required
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Product Name:</label>
              <input
                required
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Product Stock:</label>
              <input
                required
                type="number"
                placeholder="Product Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Product Photo:</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>
            {/* {photo && <img src="{photo} " alt="Product Photo" />} */}
            {photo && (
              <img
                src={photo}
                alt="Product Photo"
                style={{ width: "200px", height: "auto" }}
              />
            )}
            <button type="submit">Add Product</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
