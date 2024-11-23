import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
// import "../styles/app.scss";
import "../../styles/products.scss"; // import products.scss
import "../../styles/app.scss"; // import app.scss
import { BarChart, DoughnutChart, PieChart } from "../../components/Charts";
import { categories } from "../../assets/data.json";

const PieCharts = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels={["Shipped", "Processing", "Delivered"]}
              data={[12, 9, 13]}
              backgroundColor={[
                `hsl(110, 80%, 80%)`,
                `hsl(110, 80%, 50%)`,
                `hsl(110, 40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order Fullfillment Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
              // data={[12, 9, 13]}
              backgroundColor={categories.map(
                (i) => `hsl(${i.value * 5}, ${i.value}%, 60%)`
              )}
              legends={true}
              offset={[0, 0, 0, 50]}
            />
          </div>
          <h2>product Categories Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["In Stock", "Out of Stock"]}
              data={[40, 20]}
              backgroundColor={[`hsl(269, 80%, 40%)`, `rgb(53, 162, 255)`]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2>Stock Availability</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={[
                "Marketing cost",
                "Discount",
                "Burnt",
                "Production cost",
                "Net Margin",
              ]}
              data={[40, 20, 18, 12, 10]}
              backgroundColor={[
                `hsl(269, 80%, 40%)`,
                `hsl(200, 30%, 40%)`,
                `hsl(69, 46%, 40%)`,
                `hsl(169, 39%, 40%)`,
                `rgb(53, 162, 255)`,
              ]}
              legends={false}
              offset={[10, 20, 30, 50, 80]}
              // cutout={"70%"}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>
        <section>
          <div>
            <PieChart
              labels={[
                "Teenager (Below 20)",
                "Adult (20-40)",
                "Elders(Above 40)",
              ]}
              data={[40, 200, 30]}
              backgroundColor={[
                `hsl(10, 80%, 80%)`,
                `hsl(10, 80%, 50%)`,
                `hsl(10, 40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[40, 250]}
              backgroundColor={[`hsl(280, 50%, 70%)`, `hsl(240, 75%, 50%)`]}
              legends={true}
              offset={[0, 80]}
              // cutout={"70%"}
            />
          </div>
        </section>
        {/* <h2>Stock Availability</h2> */}
      </main>
    </div>
  );
};

export default PieCharts;
