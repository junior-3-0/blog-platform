import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom'
import axios from 'axios'

import Error from './Pages/Error'
import List from './Pages/List'
import Slug from './Pages/Slug'
import { store } from './store/store'
import Layout from './Layout'
import SignUp from './Pages/SignUp'
import { SignIn } from './Pages/SignIn'
import { RequestAuth } from './helpers/requestAuth'
import { EditProfile } from './Pages/EditProfile'
import { RequestAuth2 } from './helpers/requestAuth2'
import { CreateArticle } from './Pages/CreateArticle'
import { EditArticle } from './Pages/EditArticle'

import './index.scss'

export const URL = 'https://blog-platform.kata.academy/api/'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <List />,
      },
      {
        path: '/articles',
        element: <List />,
      },
      {
        path: '/articles/:slug',
        element: <Slug />,
        errorElement: <Error err="Server Error" />,
        loader: async ({ params }) =>
          defer({
            data: axios.get(`${URL}articles/${params.slug}`).then((data) => data),
          }),
      },
      {
        path: '/sign-up',
        element: (
          <RequestAuth>
            <SignUp />
          </RequestAuth>
        ),
      },
      {
        path: '/sign-in',
        element: (
          <RequestAuth>
            <SignIn />
          </RequestAuth>
        ),
      },
      {
        path: '/profile',
        element: (
          <RequestAuth2>
            <EditProfile />
          </RequestAuth2>
        ),
      },
      {
        path: '/new-article',
        element: (
          <RequestAuth2>
            <CreateArticle />
          </RequestAuth2>
        ),
      },
      {
        path: '/articles/:slug/edit',
        element: (
          <RequestAuth2>
            <EditArticle />
          </RequestAuth2>
        ),
        errorElement: <Error err="Server Error" />,
        loader: async ({ params }) =>
          defer({
            data: axios.get(`${URL}articles/${params.slug}`).then((data) => data),
          }),
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
