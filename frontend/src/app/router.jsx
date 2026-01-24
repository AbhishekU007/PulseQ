import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Overview from "../pages/dashboard/Overview";
import Queues from "../pages/dashboard/Queues";
import DeadEvents from "../pages/dashboard/DeadEvents";
import System from "../pages/dashboard/System";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "queues", element: <Queues /> },
      { path: "dead", element: <DeadEvents /> },
      { path: "system", element: <System /> }
    ]
  }
]);
