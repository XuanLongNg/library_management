import { Suspense } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/header";
import Style from "./style";

const MainLayout = ({ children }) => {
  return (
    <Style>
      <Header className="header" />
      <main className="wrapper">
        <Suspense>{children}</Suspense>
      </main>
      <Footer />
    </Style>
  );
};
export default MainLayout;
