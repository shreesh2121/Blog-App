import * as React from 'react';
import BlogCard from "./BlogCard";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../Redux/BlogSlice';

export default function AllBlogs() {

  const dispatch=useDispatch();
  const blogs=useSelector((state)=>state.blog.posts);

  useEffect(()=>{
    dispatch(fetchAllBlogs());
  },[]);
  console.log(blogs)

  return (
    <div>
      {blogs.map((blog,i)=>(
    <BlogCard key={i} blog={blog}/>
      ))}
    </div>
   
  );
}
