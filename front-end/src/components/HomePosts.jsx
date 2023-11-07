import React from "react";
import { useGetAllPostsQuery } from "../slices/PostSlice";
import Loader from "./Loader";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePosts = () => {
  const { keyword } = useParams();
  const { data: posts, isLoading, error } = useGetAllPostsQuery({ keyword });

  const { userInfo } = useSelector((store) => store.auth);

  return (
    <div className="h-full">
      <div className="container m-auto p-5 flex flex-col gap-5">
        {isLoading ? (
          <Loader></Loader>
        ) : error ? (
          <p>{error?.data?.message}</p>
        ) : (
          posts.map((post, index) => {
            return (
              <Link to={`/posts/${post._id}`} key={index}>
                <div className="grid  md:grid-cols-5 lg:grid-cols-3 gap-5">
                  <div className="col-span-1 md:col-span-2 lg:col-span-1 h-[250px]">
                    <img
                      src={post.photo}
                      className="w-full h-full object-cover rounded-md"
                      alt=""
                    />
                  </div>
                  <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-5">
                    <h1 className="capitalize font-bold text-lg lg:text-xl">
                      {post.title}
                    </h1>
                    <div className="flex justify-between items-center w-full lg:w-[600px]">
                      <p className="text-gray-500">@{post.user}</p>
                      <p className="text-gray-500">
                        {post.createdAt.substring(0, 10)}
                      </p>
                    </div>

                    <p className="w-full md:w-[70%]">
                      {" "}
                      {post.desc.slice(0, 150)}...
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomePosts;
