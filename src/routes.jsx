import React from "react";
import Home from "./home";
import Verify from "./verify";
import Wallet from "./wallet";
import Approved from "./approved";
import Exchange from "./exchange";
import Payment from "./payment";

const AppRoutes = () => {
  return [
    {
      path: "/",
      element: <Home />,
      id: 1,
    },
    {
      path: "/home",
      element: <Home />,
      id: 2,
    },
    {
      path: "/payment/:id", // Navigation by ID
      element: <Payment />,
      id: 3,
    },
    {
      path: "/wallet",
      element: <Wallet />,
      id: 4,
    },
    {
      path: "/approved",
      element: <Approved />,
      id: 5,
    },
    {
      path: "/exchange",
      element: <Exchange />,
      id: 6,
    },
    {
      path: "/verify",
      element: <Verify />,
      id: 7,
    },
  ];
};

export default AppRoutes;
