import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React from 'react'

function New() {
  const router = useRouter()
  const accessToken = getCookie('accessToken')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const title = data.get('title')
    const desc = data.get('desc')
    const image = data.get('image')
    const category = data.get('category')
    const userId = getCookie('userId')

    fetch(`http://localhost:5500/blogs`, {
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
      if (res.status === 201) router.push('/user/blogs')
    })
  }

  return (
    <div className="mx-40 h-[85vh] p-4 relative">
      <form onSubmit={handleSubmit} method="POST" className="flex flex-col">
        <label htmlFor="image">Title</label>
        <input
          className="border border-black rounded-md my-2 p-2"
          type="file"
          name="image"
          id="image"
        />
        <label htmlFor="title">Title</label>
        <input
          className="border border-black rounded-md my-2 p-2"
          type="text"
          id="title"
          name="title"
        />
        <label htmlFor="title">Description</label>
        <textarea
          className="border border-black rounded-md my-2 p-2"
          name="desc"
          id="desc"
          cols="30"
          rows="10"
        ></textarea>
        <select
          className="border border-black rounded-md my-2 p-2"
          name="category"
          id="category"
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
          className="flex items-center justify-center absolute bottom-4 right-4 px-8 py-2 bg-slate-400 rounded-lg font-bold text-lg hover:bg-slate-600 hover:text-slate-400"
        >
          {' '}
          + Create
        </button>
      </form>
    </div>
  )
}

export default New
