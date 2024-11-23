import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/app.scss";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import userImg from "../assets/userimage.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from "../assets/data.json";
import { BarChart, DoughnutChart } from "../components/Charts";
import { BiMaleFemale } from "react-icons/bi";
import Table from "../components/DashboardTable";

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> + {percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>
    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(${color} ${
          (Math.abs(percent) / 100) * 360
        }deg, transparent 0deg)`,
      }}
    >
      <span style={{ color: color }}>{percent}%</span>
    </div>
  </article>
);

interface CategoryItemprops {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemprops) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div style={{ backgroundColor: color, width: `${value}%` }}></div>
    </div>
    <span>{value}%</span>
  </div>
);

interface TransactionData {
  id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: string;
}

const Dashboard = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for user, data, docs" />
          <FaRegBell />
          <img src={userImg} alt="User" />
        </div>
        <section className="Widget-container">
          <WidgetItem
            heading="Revenue"
            value={34000}
            percent={10}
            amount={true}
            color="rgb(0,115,255)"
          />
          <WidgetItem
            heading="Users"
            value={400}
            percent={-40}
            amount={false}
            color="rgb(0 198 202)"
          />
          <WidgetItem
            heading="Transactions"
            value={23000}
            percent={80}
            // amount={true}
            color="rgb(255 169 0)"
          />
          <WidgetItem
            heading="Products"
            value={1000}
            percent={30}
            // amount={true}
            color="rgb(76 0 255)"
          />
        </section>
        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            {/* graph here */}
            <BarChart
              data_1={[300, 144, 433, 655, 237, 755, 564]}
              data_2={[100, 200, 300, 400, 500, 600, 700]}
              title_1={"Revenue"}
              title_2={"Transaction"}
              bgColor_1={"rgb(0,115,255)"}
              bgColor_2={"rgb(53,162,235,0.8)"}
            />
          </div>
          <div className="dashboard-categories">
            <h2>Inventory</h2>
            <div>
              {data.categories.map((i) => (
                <CategoryItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value},${i.value}%,50%)`}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rbga(53, 162, 235, 0.8)"]}
              cutout={90}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>

          <Table data={data.transaction} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
