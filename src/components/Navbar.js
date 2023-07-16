import React from 'react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Navbar() {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('accessToken')
    deleteCookie('userId')
    router.reload()
  }

  return (
    <>
      <div className="px-40 bg-slate-300  shadow-md">
        <div className="h-16 w-full flex items-center">
          <h1 className=" mx-4 font-extrabold text-2xl cursor-pointer hover:text-gray-600 ">
            Blog
          </h1>
          <ul className="flex m-auto mr-0 font-semibold ">
            <Link href="/">
              <li className="mx-4 hover:border-b-black hover:border-b-2 cursor-pointer">
                All Blogs
              </li>
            </Link>
            <Link href="/user/myBlogs">
              <li className="mx-4 hover:border-b-black hover:border-b-2 cursor-pointer">
                My Blogs
              </li>
            </Link>
            <li
              className="mx-4 hover:border-b-black hover:border-b-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
