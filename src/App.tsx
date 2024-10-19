import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesApp } from "./routes/allClientRoutes";

function App() {
  const router = createBrowserRouter(routesApp);

  return <RouterProvider router={router} />;
}

export default App;
