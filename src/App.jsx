import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { Details, Explore, Home, PageNotFound, SearchResult } from "./pages/";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/:mediaType/:id",
          element: <Details />,
        },
        {
          path: "/search/:query",
          element: <SearchResult />,
        },
        {
          path: "/explore/:mediaType",
          element: <Explore />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
