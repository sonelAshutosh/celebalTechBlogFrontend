import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import dummyImage from '../../../../../public/assets/blogImage.png'
import Image from 'next/image'
import cookie from 'cookie'

function Edit({ blogData }) {
  const router = useRouter()
  const blogId = router.query.id
  const accessToken = getCookie('accessToken')

  const [blogImage, setBlogImage] = useState(
    blogData ? { myFile: blogData.image } : { myFile: '' }
  )
  const [blogTitle, setBlogTitle] = useState(blogData ? blogData.title : '')
  const [blogDesc, setBlogDesc] = useState(blogData ? blogData.desc : '')
  const [blogCategory, setBlogCategory] = useState(
    blogData ? blogData.category : ''
  )

  const handleBlogTitleChange = (e) => {
    setBlogTitle(e.target.value)
  }

  const handleBlogDescChange = (e) => {
    setBlogDesc(e.target.value)
  }

  const handleBlogCategoryChange = (e) => {
    setBlogCategory(e.target.value)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setBlogImage({ ...blogImage, myFile: base64 })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const title = data.get('title')
    const desc = data.get('desc')
    const image = blogImage
    const category = data.get('category')
    const userId = getCookie('userId')

    // http://localhost:5500/blogs/update/64b47175f4e3c3d20e319c30
    fetch(`http://localhost:5500/blogs/update/${blogId}`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        desc,
        image,
        category,
        userId,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.status === 201) router.push('/user/myBlogs')
    })
  }

  return (
    <>
      <div className="mx-40 h-[85vh] p-4 overflow-y-auto">
        <form onSubmit={handleSubmit} method="POST" className="flex flex-col">
          <label htmlFor="image">Upload Image</label>
          <label
            htmlFor="image"
            className="h-auto w-52 rounded-lg overflow-hidden hover:brightness-50 cursor-pointer"
          >
            <Image
              src={blogImage.myFile || dummyImage}
              className="h-36 w-56"
              alt="Blog Image"
              width="360"
              height="208"
              priority
            />
          </label>
          <input
            className="h-36 w-56 hidden"
            type="file"
            name="image"
            id="image"
            accept=".jpeg, .png, .jpg"
            onChange={handleImageUpload}
          />
          <label htmlFor="title">Title</label>
          <input
            className="border border-black rounded-md my-2 p-2"
            type="text"
            id="title"
            name="title"
            value={blogTitle}
            onChange={handleBlogTitleChange}
          />
          <label htmlFor="title">Description</label>
          <textarea
            className="border border-black rounded-md my-2 p-2"
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            value={blogDesc}
            onChange={handleBlogDescChange}
          ></textarea>
          <select
            className="border border-black rounded-md my-2 p-2"
            name="category"
            id="category"
            value={blogCategory}
            onChange={handleBlogCategoryChange}
          >
            <option value="all">All</option>
            <option value="technology">Technology</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="news">News</option>
            <option value="health">Health</option>
          </select>

          <button
            type="submit"
            className="flex items-center justify-center absolute bottom-12 right-10 px-6 py-2 bg-slate-400 rounded-lg font-bold text-lg hover:bg-slate-600 hover:text-slate-400"
          >
            {' '}
            Update
          </button>
        </form>
      </div>
    </>
  )
}

export default Edit

export async function getServerSideProps(context) {
  const blogId = context.params.id
  const { req } = context
  const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie)
  const { accessToken, userId } = cookies

  const blogResponse = await fetch(
    `${process.env.SERVER_URL}/blogs/${blogId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  )
  const blogData = await blogResponse.json()
  const { blog } = blogData

  return {
    props: {
      blogData: blog,
    },
  }
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
