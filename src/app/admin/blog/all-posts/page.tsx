"use client";

import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import BlogPosts from "@/screens/Blog/AdminBlog/BlogCard";
import Admin from "@/screens/Dashboard/Admin";

import React from "react";

const Page = () => {
  return (
    <Admin>
       <BreadcrumbsWithIcon route="All Posts" root="Blog"/>
      <BlogPosts />
    </Admin>
  );
};

export default Page;
