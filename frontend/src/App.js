import "./App.css";
import { useRoutes } from "react-router-dom";
import ConfigRoutes from "./routes/configRoutes";

function App() {
  const convertRoutes = ConfigRoutes.map((route) => {
    const { layout, element: elementRoute } = route;
    let element = elementRoute;
    if (layout) {
      const Layout = layout;
      element = <Layout>{element}</Layout>;
    }
    return {
      ...route,
      element,
    };
  });
  const element = useRoutes(convertRoutes);
  return <div className="App">{element}</div>;
}

export default App;
