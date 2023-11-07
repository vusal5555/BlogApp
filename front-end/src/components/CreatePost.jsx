import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  useCreatePostMutation,
  useUploadBlogImageMutation,
} from "../slices/PostSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Loader from "./Loader";

const CreatePost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImg] = useState("");

  const navigate = useNavigate();

  const [createPost, { isLoading }] = useCreatePostMutation();
  const [uploadBlogImage, { isLoading: blogImageLoading }] =
    useUploadBlogImageMutation();

  const deleteCat = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = (e) => {
    e.preventDefault();

    let updatedCats = [...cats];

    if (cat === "") {
      alert("Please add categories");
      return;
    }
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createPost({
        title,
        desc,
        categories: cats,
        photo: image,
      }).unwrap();
      navigate("/");
      toast.success("Post created");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res.message);
      console.log(res);
      setImg(res.image);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="container m-auto h-screen p-5">
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold">Create a post</h1>

        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 w-full md:w-[400px]"
        >
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImg(e.target.value)}
            />
            <input type="file" onChange={(e) => uploadFileHandler(e)} />
          </div>
          <div className="flex gap-1">
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-200 rounded-md outline-none"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              placeholder="Enter post categories"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={addCategory}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {cats?.map((cat, i) => {
              return (
                <div className="flex items-center justify-center gap-2  py-2 px-2 bg-blue-500 text-white rounded-lg">
                  <p>{cat}</p>
                  <FaTimes onClick={() => deleteCat(i)}></FaTimes>
                </div>
              );
            })}
          </div>
          <textarea
            rows="10"
            className="px-4 py-2 bg-gray-200 rounded-md outline-none"
            value={desc}
            placeholder="Enter post description"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Submit
          </button>

          {isLoading && <Loader></Loader>}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
