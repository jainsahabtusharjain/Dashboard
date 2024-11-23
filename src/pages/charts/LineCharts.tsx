import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/products.scss";
import "../../styles/app.scss";
import { LineChart } from "../../components/Charts";

const LineCharts = () => {
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

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        <section>
          <LineChart
            data={[
              34000, // January
              36500, // February
              39000, // March
              41500, // April
              38000, // May
              42000, // June
              45000, // July
              47500, // August
              44000, // September
              46000, // October
              48000, // November
              50000, // December
            ]}
            label="Annual Revenue"
            backgroundColor="rgba(75, 192, 192, 0.2)"
            borderColor="rgba(75, 192, 192,0.85)"
            labels={months}
          />
          <h2>Yearly Revenue Progression</h2>
        </section>
        <section>
          <LineChart
            data={[
              30, // January
              30, // February
              30, // March
              40, // April
              30, // May
              18, // June
              40, // July
              40, // August
              48, // September
              40, // October
              40, // November
              59, // December
            ]}
            // label="Annual Revenue"
            backgroundColor={`hsla(269,80%,40%,0.4)`}
            borderColor={`hsl(269,80%,40%)`}
            label="Products"
            labels={months}
          />
          <h2>Total Products (SKU)</h2>
        </section>
        <section>
          <LineChart
            data={[
              34000, // January
              36500, // February
              39000, // March
              41500, // April
              38000, // May
              42000, // June
              45000, // July
              47500, // August
              44000, // September
              46000, // October
              48000, // November
              50000, // December
            ]}
            // label="Annual Revenue"
            backgroundColor={`hsla(129,80%,40%,0.4)`}
            borderColor={`hsl(129,80%,40%)`}
            label="Revenue"
            labels={months}
          />
          <h2>Total Revenue</h2>
        </section>
        <section>
          <LineChart
            data={[
              84000, // January
              36500, // February
              39000, // March
              41500, // April
              38000, // May
              32000, // June
              45000, // July
              7500, // August
              44000, // September
              26000, // October
              48000, // November
              32000, // December
            ]}
            // label="Annual Revenue"
            backgroundColor={`hsla(29,80%,40%,0.4)`}
            borderColor={`hsl(29,80%,40%)`}
            label="Revenue"
            labels={months}
          />
          <h2>Discount Allotted</h2>
        </section>
      </main>
    </div>
  );
};

export default LineCharts;
