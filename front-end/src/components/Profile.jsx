import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editProfile, { isLoading, error }] = useProfileMutation();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const editProfileHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await editProfile({
          userId: userInfo._id,
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        toast.success("User updated");
        dispatch(setCredentials({ ...res }));
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div className="h-full">
      <div className="container m-auto p-5 flex flex-col gap-5">
        {isLoading ? (
          <Loader></Loader>
        ) : error ? (
          <p>{error?.data?.message}</p>
        ) : (
          <div
            onSubmit={editProfileHandler}
            className="container grid grid-cols-2 p-5"
          >
            <div>
              <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
              <form className="flex flex-col gap-5 w-[400px]">
                <div className="flex flex-col gap-2">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="name"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="email"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="password"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
