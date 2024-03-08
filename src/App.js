import React from "react";
import "./App.css";
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import Feed from "./components/Feed";
import NewPostFeed from "./components/new-post/NewPostFeed";
import Layout from "./components/Layout";
import Posts from "./components/browse/Posts";
import Apartments from "./components/browse/Apartments";
import Houses from "./components/browse/Houses";
import Plots from "./components/browse/Plots";
import SinglePost from "./components/browse/SinglePost";
import ChooseEstate from "./components/new-post/ChooseEstate";
import AddPlot from "./components/new-post/AddPlot";
import SinglePlotPost from "./components/browse/SinglePlotPost";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MyPosts from "./components/MyPosts";
import { LanguageProvider } from './files/LanguageContext';


const homePage = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Feed /> },
      { path: "/add-new", element: <ChooseEstate/>},
      { path: "/add-new-estate", element: <NewPostFeed /> },
      { path: "/add-new-plot", element: <AddPlot/>},
      { path: "/posts", element: <Posts /> },
      { path: '/apartments', element: <Apartments /> },
      { path: '/houses', element: <Houses /> },
      { path: '/plots', element: <Plots /> },
      { path: '/:id', element: <SinglePost /> },
      { path: '/plots/:id', element: <SinglePlotPost/> },
      { path: '/login', element: <Login/>},
      { path: '/signup', element: <SignUp/>},
      { path: '/my-posts', element: <MyPosts/>}
    ]
  }
]);

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={homePage} />
    </LanguageProvider>
  );
}

export default App;