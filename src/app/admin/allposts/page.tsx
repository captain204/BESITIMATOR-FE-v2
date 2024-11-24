"use client";

import BlogPosts from "@/screens/Blog/AdminBlog/BlogCard";
import Admin from "@/screens/Dashboard/Admin";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <BlogPosts />
    </Admin>
  );
};

export default Page;
