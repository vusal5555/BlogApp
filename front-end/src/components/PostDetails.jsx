import React, { useState } from "react";
import {
  useGetSingPostQuery,
  useDeletePostMutation,
  useCreateCommentMutation,
} from "../slices/PostSlice";
import { useParams } from "react-router";
import Loader from "./Loader";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const { id: postId } = useParams();
  const { data: post, refetch, isLoading, error } = useGetSingPostQuery(postId);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();
  const [createComment, { isLoading: commentLoading }] =
    useCreateCommentMutation();

  if (isLoading) {
    return <Loader></Loader>;
  }

  const deleteHandler = async (id) => {
    try {
      await deletePost(id);
      navigate("/");
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const createCommentHandler = async (e) => {
    e.preventDefault();
    try {
      await createComment({ postId, comment: comment }).unwrap();
      refetch();
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="container m-auto p-5">
      <div className="flex flex-col gap-5 w-full  lg:w-[800px] m-auto">
        <div className="flex items-center justify-between">
          <h1 className="capitalize font-bold text-md md:text-lg lg:text-2xl">
            {post.title}
          </h1>
          {userInfo?._id === post.userId && (
            <div className="flex gap-2">
              <button onClick={() => deleteHandler(post._id)}>
                <FaTimes></FaTimes>
              </button>
              <Link to={`/edit/${post._id}`}>
                <button>
                  <FaEdit></FaEdit>
                </button>
              </Link>
            </div>
          )}
        </div>

        <div>
          <img
            src={post.photo}
            className="w-full h-[533px] rounded-md object-cover"
            alt=""
          />
        </div>
        <div>
          <p className="text-md">{post.desc}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p>Categories: </p>
          {post.categories.length === 0 ? (
            <p>No categories</p>
          ) : (
            post.categories.map((cat, index) => {
              return (
                <p className="p-3 bg-gray-300 rounded-lg" key={index}>
                  {cat}
                </p>
              );
            })
          )}
        </div>
        <div>
          <p className="mb-5">Comments: </p>

          {post.comments.map((comment, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 bg-gray-300 p-3 rounded-md mb-3"
              >
                <div className="flex items-center justify-between">
                  <p>@{comment.name}</p>
                  <p>{comment.createdAt.substring(0, 10)}</p>
                </div>

                <div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={createCommentHandler}
          className="flex flex-col items-center w-full md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full md:w-[80%] bg-gray-300 px-4 py-2 rounded-md outline-none"
          />
          <button
            type="submit"
            className="bg-black px-4 py-2 rounded-md text-white w-full md:w-[20%]"
          >
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
