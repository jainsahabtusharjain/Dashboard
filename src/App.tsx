import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import React from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Product = lazy(() => import("./pages/Product"));
const Customer = lazy(() => import("./pages/Customer"));
const Transaction = lazy(() => import("./pages/Transaction"));
const NewProduct = lazy(() => import("./pages/management/NewProduct"));
const ProductManagement = lazy(
  () => import("./pages/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/management/TransactionManagement")
);
const BarCharts = lazy(() => import("./pages/charts/BarChart"));
const LineCharts = lazy(() => import("./pages/charts/LineCharts"));
const PieCharts = lazy(() => import("./pages/charts/PieCharts"));

const Coupon = lazy(() => import("./pages/Apps/Coupon"));
const Stopwatch = lazy(() => import("./pages/Apps/Stopwatch"));
const Toss = lazy(() => import("./pages/Apps/Toss"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Link to={"/admin/dashboard"}>
                <button>Visit Dashboard</button>
              </Link>
            }
          />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          <Route path="/admin/customer" element={<Customer />} />
          <Route path="/admin/product" element={<Product />} />

          {/* Charts */}
          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />

          {/* apps */}
          <Route path="/admin/apps/coupon" element={<Coupon />} />
          <Route path="/admin/apps/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/apps/toss" element={<Toss />} />

          {/* Management */}
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
