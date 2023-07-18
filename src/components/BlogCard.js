import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import dummyImage from '../../public/assets/blogImage.png'

function BlogCard({ _id, title, desc, imgSrc, createdAt }) {
  return (
    <Link key={_id} href={`/user/blogs/${_id}`} className="cursor-pointer">
      <div
        key={_id}
        className="h-44 w-full p-4 my-4 flex items-center shadow-lg rounded-md border border-solid border-b-4 border-r-4 border-black hover:scale-[1.025] transition-all relative"
      >
        <Image
          src={imgSrc ? imgSrc : dummyImage}
          alt="Blog Image"
          className="h-40 w-56 rounded-md shadow-lg border border-gray-500"
          height="160"
          width="230"
          priority
        />
        <div className="h-full p-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg ">{desc}</p>
          <span className="text-gray-400 absolute bottom-2 right-4">
            {new Date(createdAt).toLocaleDateString('en-US')}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
