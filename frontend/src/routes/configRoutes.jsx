import { Navigate } from "react-router";
// import MainLayout from "../layouts/main/mainLayout";
// import HomePage from "../pages/main";
import AppRoutes from "./appRoutes";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import BookList from "../pages/admin/bookList/bookList";
import BookView from "../pages/admin/book/bookView";
import PriceItemView from "../pages/admin/priceItemView/PriceItemView";
import BooksUserView from "../pages/user/bookList/BooksUserView";
import BookUserView from "../pages/user/bookView/BookUserView";
import MainLayout from "../layout/mainLayout";
import HistoryPurchase from "../pages/user/historyPurchase/historyPurchase";
import HomePage from "../pages/home/HomePage";
import Bill from "../pages/user/bill/Bill";

const ConfigRoutes = [
  {
    path: AppRoutes.HOME_PAGE,
    element: <HomePage />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.LOGIN,
    element: <Login />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.REGISTER,
    element: <Register />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.ADMIN + AppRoutes.PRICE_ITEM,
    element: <PriceItemView />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.ADMIN + AppRoutes.BOOK_VIEW,
    element: <BookView />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.ADMIN + AppRoutes.BOOKS_VIEW,
    element: <BookList />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.BOOKS_VIEW,
    element: <BooksUserView />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.BOOK_VIEW,
    element: <BookUserView />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.HISTORY_PURCHASE,
    element: <HistoryPurchase />,
    layout: MainLayout,
  },
  {
    path: AppRoutes.BILL_VIEW,
    element: <Bill />,
    layout: MainLayout,
  },
  {
    path: "*",
    element: <Navigate to={AppRoutes.NOT_FOUND} />,
  },
];
export default ConfigRoutes;
