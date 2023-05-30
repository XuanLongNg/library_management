import { Navigate } from "react-router";
// import MainLayout from "../layouts/main/mainLayout";
// import HomePage from "../pages/main";
import AppRoutes from "./appRoutes";
import Login from "../pages/login/login";
import Register from "../pages/register/register";

const ConfigRoutes = [
  {
    path: AppRoutes.HOME_PAGE,
    element: <div />,
    // layout: MainLayout,
  },
  {
    path: AppRoutes.LOGIN,
    element: <Login />,
    // layout: MainLayout,
  },
  {
    path: AppRoutes.REGISTER,
    element: <Register />,
    // layout: MainLayout,
  },
  {
    path: "*",
    element: <Navigate to={AppRoutes.NOT_FOUND} />,
  },
];
export default ConfigRoutes;