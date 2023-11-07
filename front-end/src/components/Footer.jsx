import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-600 text-white p-[5rem] flex flex-col gap-5 mt-auto">
      <div className="container m-auto grid md:grid-cols-2 lg:grid-cols-3 mb-5 gap-5">
        <div>
          <p>Feautured Blogs</p>
          <p>Feautured Blogs</p>
          <p>Feautured Blogs</p>
        </div>
        <div>
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div>
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
      <div>
        <p className="text-center">copy@right2023</p>
      </div>
    </footer>
  );
};

export default Footer;
