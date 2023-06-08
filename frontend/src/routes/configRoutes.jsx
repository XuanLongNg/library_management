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
    path: AppRoutes.ADMIN + AppRoutes.PRICE_ITEM,
    element: <PriceItemView />,
  },
  {
    path: AppRoutes.ADMIN + AppRoutes.BOOK_VIEW,
    element: <BookView />,
  },
  {
    path: AppRoutes.ADMIN + AppRoutes.BOOKS_VIEW,
    element: <BookList />,
  },
  {
    path: AppRoutes.BOOKS_VIEW,
    element: <BooksUserView />,
  },
  {
    path: AppRoutes.BOOK_VIEW,
    element: <BookUserView />,
  },
  {
    path: "*",
    element: <Navigate to={AppRoutes.NOT_FOUND} />,
  },
];
export default ConfigRoutes;
