import BlogCard from '@/components/BlogCard'
import { useState } from 'react'
import { getCookie } from 'cookies-next'

export default function Index({ data }) {
  const accessToken = getCookie('accessToken')
  const [blogs, setBlogs] = useState(data.blogs)
  // const { blogs } = data

  const handleFilter = async (e) => {
    console.log(e.target.value)
    const response = await fetch(
      `http://localhost:5500/blogs/category/${e.target.value}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
    // .then((res) => {
    //   if (res.status === 500) return
    // })
    const data = await response.json()
    const { categoryBlogs } = data
    setBlogs(categoryBlogs)
  }

  // console.log(blogs)
  return (
    <>
      <div className=" mx-40 p-4 sticky top-0 z-10">
        <label htmlFor="category"> Filter: </label>
        <select
          className="border border-black rounded-md p-1"
          name="category"
          id="category"
          onChange={handleFilter}
        >
          <option value="all">All</option>
          <option value="technology">Technology</option>
          <option value="fashion">Fashion</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="news">News</option>
          <option value="health">Health</option>
        </select>
      </div>
      <div className="mx-40 h-[85vh] px-4 pt-0 pb-4 overflow-y-auto">
        <div>
          {blogs.map((blog) => {
            return (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                desc={blog.desc}
                imgSrc={blog.image}
                createdAt={blog.createdAt}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const response = await fetch(`http://localhost:5500/blogs`, { method: 'GET' })
  const blogs = await response.json()

  return {
    props: {
      data: blogs,
    },
  }
}
