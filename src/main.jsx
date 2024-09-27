import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import Error from "./Pages/Error/error";
import List from "./Pages/List/list";
import Slug from "./Pages/Slug/slug";

import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./Layout/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <List />,
      },
      {
        path: "/articles",
        element: <List />,
      },
      {
        path: "/articles/:slug",
        element: <Slug />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
