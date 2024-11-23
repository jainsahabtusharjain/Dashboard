import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import {
  RiDashboardFill,
  RiShoppingBagFill,
  RiCoupon3Fill,
} from "react-icons/ri";
import {
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaStopwatch,
  FaGamepad,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";

const AdminSidebar = () => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const dashboardLinks = [
    { url: "/admin/dashboard", text: "Dashboard", icon: RiDashboardFill },
    { url: "/admin/product", text: "Products", icon: RiShoppingBagFill },
    { url: "/admin/customer", text: "Customers", icon: IoIosPeople },
    { url: "/admin/transaction", text: "Transactions", icon: AiFillFileText },
  ];

  const chartLinks = [
    { url: "/admin/chart/bar", text: "Bar Charts", icon: FaChartBar },
    { url: "/admin/chart/pie", text: "Pie Charts", icon: FaChartPie },
    { url: "/admin/chart/line", text: "Line Charts", icon: FaChartLine },
  ];

  const AppsLinks = [
    { url: "/admin/apps/stopwatch", text: "Stop Watch", icon: FaStopwatch },
    { url: "/admin/apps/coupon", text: "Coupons", icon: RiCoupon3Fill },
    { url: "/admin/apps/toss", text: "Toss", icon: FaGamepad },
  ];

  const renderLinks = (
    links: Array<{ url: string; text: string; icon: IconType }>
  ) => {
    return links.map(({ url, text, icon: Icon }, index) => (
      <li
        key={index}
        style={{
          backgroundColor: location.pathname.includes(url)
            ? "rgba(0,115,225,0.1)"
            : "white",
        }}
      >
        <Link
          to={url}
          style={{
            color: location.pathname.includes(url) ? "rgb(0,115,225)" : "Black",
          }}
        >
          <Icon />
          {text}
        </Link>
      </li>
    ));
  };

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeaHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeaHandler);

    return () => {
      window.removeEventListener("resize", resizeaHandler);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowMobileMenu(true)}>
          <HiMenuAlt4 />
        </button>
      )}
      <aside
        ref={sidebarRef}
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: "0",
                left: showMobileMenu ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <h2>Logo.</h2>
        <div>
          <h5>Dashboard</h5>
          <ul>{renderLinks(dashboardLinks)}</ul>
        </div>
        <div>
          <h5>Charts</h5>
          <ul>{renderLinks(chartLinks)}</ul>
        </div>
        <div>
          <h5>Apps</h5>
          <ul>{renderLinks(AppsLinks)}</ul>
        </div>
        {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowMobileMenu(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

export default AdminSidebar;
