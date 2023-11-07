import dotenv from "dotenv";
import users from "./data/users.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import connect from "../db/connectDb.js";
import blogs from "./data/products.js";

dotenv.config();

connect();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0].name;

    const sampleBlogs = blogs.map((blog) => {
      return { ...blog, user: adminUser };
    });

    await Post.insertMany(sampleBlogs);

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-id") {
  destroyData();
} else {
  importData();
}
