import React from 'react'
import BlogCard from './BlogCard'

function MyBlog() {
  return (
    <div style={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-between",
        // width:"30%"
    }}>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
    </div>
  )
}

export default MyBlog