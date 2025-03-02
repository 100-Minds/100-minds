import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Index from "./views/dashboard/Index";
import routes from "./routes/routes";
import { SidebarProvider } from "./context/SidebarContex";
import Error from "./views/Error/Error";

function RenderRoutes(routeList) {
  return routeList.map(({ path, component: Component, children }, index) => (
    <Route key={index} path={path} element={<Component />}>
      {children && RenderRoutes(children)}{" "}
      {/* Recursively handle child routes */}
    </Route>
  ));
}

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          {/* The Layout should wrap all routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            {/* Add other routes here */}
            {/* {routes.map(({ path, component: Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))} */}
            {RenderRoutes(routes)}
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
