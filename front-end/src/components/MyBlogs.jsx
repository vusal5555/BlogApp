import React from "react";
import { useGetMyPostsQuery } from "../slices/PostSlice";
import Loader from "./Loader";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const { keyword } = useParams();

  const { data: posts, isLoading: postLoading } = useGetMyPostsQuery({
    ...keyword,
  });

  return (
    <div className="container m-auto p-5">
      <h1 className="font-bold text-3xl text-center mb-5">My Blogs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {postLoading ? (
          <Loader></Loader>
        ) : (
          posts.map((post, index) => {
            return (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg shadow-xl text-black"
              >
                <div className="h-[300px]">
                  <img
                    className="rounded-t-lg h-full w-full object-cover"
                    src={post.photo}
                    alt=""
                  />
                </div>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold">{post.title}</h5>
                  </a>
                  <p className="mb-3 font-normal">
                    {post.desc.slice(0, 120)}...
                  </p>
                  <Link to={`/posts/${post._id}`}>
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                  text-white bg-blue-700 rounded-lg 
                  hover:bg-blue-800 focus:ring-4 focus:outline-none 
                  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
