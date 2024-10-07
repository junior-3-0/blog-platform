import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import Error from "./Pages/Error/error";
import List from "./Pages/List/list";
import Slug from "./Pages/Slug/slug";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./Layout/layout";
import axios from "axios";
import SignUp from "./Pages/SignUp/signup";
import { SignIn } from "./Pages/SignIn/signin";
import { RequestAuth } from "./helpers/requestAuth";
import { EditProfile } from "./Pages/EditProfile/editProfile";
import { RequestAuth2 } from "./helpers/requestAuth2";
import { CreateArticle } from "./Pages/CreateArticle/createArticle";
import { EditArticle } from "./Pages/EditArticle/editArticle";
import "./index.scss";

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
        errorElement: <Error err={"Server Error"} />,
        loader: async ({ params }) => {
          return defer({
            data: axios
              .get(`https://blog.kata.academy/api/articles/${params.slug}`)
              .then((data) => data),
          });
        },
      },
      {
        path: "/sign-up",
        element: (
          <RequestAuth>
            <SignUp />
          </RequestAuth>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <RequestAuth>
            <SignIn />
          </RequestAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequestAuth2>
            <EditProfile />
          </RequestAuth2>
        ),
      },
      {
        path: "/new-article",
        element: (
          <RequestAuth2>
            <CreateArticle />
          </RequestAuth2>
        ),
      },
      {
        path: "/articles/:slug/edit",
        element: (
          <RequestAuth2>
            <EditArticle />
          </RequestAuth2>
        ),
        errorElement: <Error err={"Server Error"} />,
        loader: async ({ params }) => {
          return defer({
            data: axios
              .get(`https://blog.kata.academy/api/articles/${params.slug}`)
              .then((data) => data),
          });
        },
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
