import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePosts from "./components/HomePosts";
import Login from "./components/Login";
import Register from "./components/Register";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import MyBlogs from "./components/MyBlogs";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="min-h-screen">
        <Routes>
          <Route
            index={true}
            path="/"
            element={<HomePosts></HomePosts>}
          ></Route>
          <Route
            path="/search/:keyword"
            element={<HomePosts></HomePosts>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/posts/:id"
            element={<PostDetails></PostDetails>}
          ></Route>
          <Route path="/create" element={<CreatePost></CreatePost>}></Route>
          <Route path="/edit/:id" element={<EditPost></EditPost>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/myblogs" element={<MyBlogs></MyBlogs>}></Route>
        </Routes>
      </main>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
