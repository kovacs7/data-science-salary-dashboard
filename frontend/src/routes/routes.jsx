import { createBrowserRouter } from "react-router-dom";
import Tables from "../pages/Tables";
import Chat from "../pages/Chat"

export const routes = createBrowserRouter([
  { path: "/", element: <Tables /> },
  { path: "/Chat", element: <Chat /> },
]);
