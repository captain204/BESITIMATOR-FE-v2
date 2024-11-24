"use client";

import PostBlog from "@/screens/Blog/AdminBlog/AddPosts";
import BlogPosts from "@/screens/Blog/AdminBlog/BlogCard";
import Admin from "@/screens/Dashboard/Admin";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <PostBlog />
    </Admin>
  );
};

export default Page;
