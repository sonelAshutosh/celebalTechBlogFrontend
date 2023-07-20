import DeleteIcon from '@/svg/DeleteIcon'
import EditIcon from '@/svg/EditIcon'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import AddIcon from '@/svg/AddIcon'

function Commment({ id, content, userId, createdAt }) {
  const loggedInUserId = getCookie('userId')
  const accessToken = getCookie('accessToken')

  const [editable, setEditAble] = useState(false)
  const [commentUser, setCommentUser] = useState({})
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [commentContent, setCommentContent] = useState(content)

  useEffect(() => {
    setEditAble(userId === loggedInUserId ? true : false)

    fetch(
      `https://celebal-tech-blog-backend-msz9rhal0-sonelashutosh.vercel.app/users/user/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setCommentUser(res.user)
      })
  }, [])

  const handleCommentEdit = () => {
    setCurrentlyEditing(!currentlyEditing)
  }

  const handleEditCommentChange = (e) => {
    setCommentContent(e.target.value)
  }

  const handleCommentUpdate = () => {
    fetch(
      `https://celebal-tech-blog-backend-msz9rhal0-sonelashutosh.vercel.app/comments/comment/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          id,
          content: commentContent,
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    ).then((res) => {
      setCurrentlyEditing(!currentlyEditing)
      if (res.status === 200) Router.reload()
    })
  }

  const handleCommentDelete = () => {
    fetch(
      `https://celebal-tech-blog-backend-msz9rhal0-sonelashutosh.vercel.app/comments/comment/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    ).then((res) => {
      if (res.status === 201) Router.reload()
    })
  }

  return (
    <div
      key={id}
      className="border border-gray-200 bg-gray-100 rounded-lg py-2 px-8 my-2"
    >
      <div className="flex items-center">
        <h3 className="font-semibold tracking-wider">{commentUser.name}</h3>
        &nbsp;
        <div className="h-[4px] w-[4px] bg-gray-400 rounded-full" />
        &nbsp;
        <p className="text-gray-400">
          {new Date(createdAt).toLocaleDateString('en-US')}
        </p>
        {editable ? (
          <div
            className="ml-8 px-2 py-1 mx-2 cursor-pointer hover:text-gray-300 hover:bg-gray-600 rounded-lg"
            onClick={currentlyEditing ? handleCommentUpdate : handleCommentEdit}
          >
            {currentlyEditing ? <AddIcon /> : <EditIcon />}
          </div>
        ) : (
          <div></div>
        )}
        {editable ? (
          <div
            className="px-2
            py-1
            mx-2
            cursor-pointer
            hover:text-gray-300
            hover:bg-gray-600
            rounded-lg"
            onClick={handleCommentDelete}
          >
            <DeleteIcon />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="font-normal">
        {currentlyEditing ? (
          <textarea
            className="border border-gray-300 rounded-xl resize-none p-2 px-4 my-2 w-full"
            value={commentContent}
            onChange={handleEditCommentChange}
          ></textarea>
        ) : (
          content
        )}
      </div>
    </div>
  )
}

export default Commment
