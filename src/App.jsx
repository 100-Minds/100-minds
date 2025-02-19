import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Index from "./views/dashboard/Index";
import routes from "./routes/routes";
import { SidebarProvider } from "./context/SidebarContex";

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          {/* The Layout should wrap all routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            {/* Add other routes here */}
            {routes.map(({ path, component: Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
