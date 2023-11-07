import Post from "../models/Post.js";
import asyncHandler from "express-async-handler";

export const getAllPosts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const posts = await Post.find({ ...keyword });

  res.status(200).json(posts);
});

export const getMyPosts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const posts = await Post.find({ ...keyword, userId: req.user._id });

  res.status(200).json(posts);
});

export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error("Post Not found");
  }
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, desc, categories, photo } = req.body;
  const post = await Post.create({
    userId: req.user._id,
    user: req.user.name,
    title,
    desc,
    photo: photo,
    categories,
  });

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(401);
    throw new Error("Post cannot be created");
  }
});

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, desc, categories, photo } = req.body;
  const post = await Post.findById(id);

  if (post) {
    post.title = title || post.title;
    post.desc = desc || post.desc;
    post.categories = categories || post.categories;
    post.photo = photo || post.photo;

    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);

  if (post) {
    res.status(200).json({ msg: "Blog deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export const createComment = asyncHandler(async (req, res) => {
  const { name, comment } = req.body;
  const { id } = req.params;
  const post = await Post.findById(id);

  if (post) {
    const commentText = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    post.comments.push(commentText);

    await post.save();

    res.status(201).json({ msg: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
