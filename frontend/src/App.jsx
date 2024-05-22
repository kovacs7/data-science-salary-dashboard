import Tables from "./pages/Tables";
import { routes } from "./routes/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <RouterProvider router={routes}>
      <Tables />
    </RouterProvider>
  );
};

export default App;
