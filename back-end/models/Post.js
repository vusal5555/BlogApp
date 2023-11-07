import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: false,
    },

    desc: {
      type: String,
      required: true,
      unique: false,
    },
    photo: {
      type: String,
      unique: false,
    },

    categories: {
      type: Array,
      unique: false,
    },

    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
