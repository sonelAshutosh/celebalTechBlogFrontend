import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import Router, { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'

function Comments() {
  const router = useRouter()
  const blogId = router.query.id
  const accessToken = getCookie('accessToken')
  const userId = getCookie('userId')

  // console.log(id)

  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(
      `https://celebal-tech-blog-backend-msz9rhal0-sonelashutosh.vercel.app/comments/comment/${blogId}`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setComments(res.commentsById)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const content = data.get('comment')

    fetch(
      `https://celebal-tech-blog-backend-msz9rhal0-sonelashutosh.vercel.app/comments`,
      {
        method: 'POST',
        body: JSON.stringify({
          content,
          blogId,
          userId,
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    ).then((res) => {
      if (res.status === 200) Router.reload()
    })
  }

  return (
    <div className="mx-4 py-4 border-t-2">
      <h1 className="text-2xl font-extrabold tracking-wider mb-4">Comments</h1>
      <div className="border border-gray-300 rounded-lg p-2 bg-gray-100">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="comment"
            className="font-semibold text-lg text-gray-400"
          >
            Write a Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            cols="10"
            rows="2"
            className="border border-gray-300 rounded-xl resize-none p-2 px-4 w-full"
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 border border-gray-300 hover:bg-slate-300 rounded-lg text-sm font-medium "
          >
            + Add
          </button>
        </form>
      </div>
      {/* ------------------------------------------------------ */}
      {/* Comments --------------------------------------------- */}
      {/* ------------------------------------------------------ */}
      <div>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              id={comment._id}
              content={comment.content}
              userId={comment.userId}
              createdAt={comment.createdAt}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Comments
