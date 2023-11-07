import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { unSetCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { userInfo } = useSelector((store) => store.auth);

  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isLoading, error }] = useLogoutMutation();

  const logOutHandler = async () => {
    try {
      await logout();
      dispatch(unSetCredentials());
      toast.success("user logged out");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
    setKeyword("");
  };
  return (
    <div className="w-full bg-blue-500 text-white">
      <div className="container m-auto flex items-center justify-between p-5">
        <div>
          <Link to="/">
            <h1 className="font-bold text-md md:text-lg lg::text-xl">
              Blog Market
            </h1>
          </Link>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-[200px] md:w-[250px] lg:w-[400px] m-auto flex items-center px-4 py-2 border border-white rounded-full"
        >
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className="w-full outline-none bg-blue-500 placeholder-current text-white"
            placeholder="Search blog"
          />

          <button type="submit" className="text-lg">
            <AiOutlineSearch></AiOutlineSearch>
          </button>
        </form>
        <nav className="hidden md:flex items-center gap-5">
          {userInfo && <Link to="/create">Write</Link>}
          {userInfo ? (
            <button onClick={() => logOutHandler()}>Log out</button>
          ) : (
            <Link to="/login">
              <p>Login</p>
            </Link>
          )}
          {userInfo ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">{<h1>{userInfo.name}</h1>}</Link>

              <Link to="/myblogs">My Blogs</Link>
            </div>
          ) : (
            <Link to="/register">
              <p>Register</p>
            </Link>
          )}
        </nav>

        <div className="block md:hidden">
          <button className="text-2xl" onClick={() => setOpen(!open)}>
            {!open ? <GiHamburgerMenu></GiHamburgerMenu> : <FaTimes></FaTimes>}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="flex flex-col md:hidden items-center gap-5 p-5">
          {userInfo && <Link to="/create">Write</Link>}
          {userInfo ? (
            <button onClick={() => logOutHandler()}>Log out</button>
          ) : (
            <Link to="/login">
              <p>Login</p>
            </Link>
          )}
          {userInfo ? (
            <>
              <Link to="/profile">{<h1>{userInfo.name}</h1>}</Link>

              <Link to="/myblogs">My Blogs</Link>
            </>
          ) : (
            <Link to="/register">
              <p>Register</p>
            </Link>
          )}
        </nav>
      ) : null}
    </div>
  );
};

export default Navbar;
