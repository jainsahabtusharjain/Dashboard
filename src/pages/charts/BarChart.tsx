import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
// import "../styles/app.scss";
import "../../styles/products.scss"; // import products.scss
import "../../styles/app.scss"; // import app.scss
import { BarChart } from "../../components/Charts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BarCharts = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_1={[150, 200, 300, 250, 400, 350]} // Sample data for Products
            data_2={[50, 100, 150, 200, 250, 300]} // Sample data for Users
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
          />
          <h2>Top selling product & top Customers</h2>
        </section>
        <section>
          <BarChart
            horizontal={true}
            data_1={[
              150, 200, 300, 250, 400, 350, 450, 500, 600, 700, 800, 900,
            ]} // Sample data for Products
            data_2={[]} // Sample data for Users
            title_1="Products"
            title_2=""
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2=""
            labels={months}
          />
          <h2>Oders throught the year </h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
