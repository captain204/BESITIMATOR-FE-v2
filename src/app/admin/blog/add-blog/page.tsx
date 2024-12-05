"use client";

import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import PostBlog from "@/screens/Blog/AdminBlog/AddPosts";
import BlogPosts from "@/screens/Blog/AdminBlog/BlogCard";
import Admin from "@/screens/Dashboard/Admin";

import React from "react";

const Page = () => {
  return (
    <Admin>
       <BreadcrumbsWithIcon route="Add Blog" root="Blog"/>
      <PostBlog />
    </Admin>
  );
};

export default Page;
