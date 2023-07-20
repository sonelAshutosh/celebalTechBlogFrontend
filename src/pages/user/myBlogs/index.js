import Link from 'next/link'
import cookie from 'cookie'
import BlogCard from '@/components/BlogCard'

export default function index({ data }) {
  const { userBlogs } = data
  return (
    <>
      <div className="mx-40 h-[85vh] p-4 overflow-y-auto">
        {userBlogs.map((blog) => {
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
      <Link href="/user/myBlogs/new">
        <div className="flex items-center justify-center absolute bottom-12 right-10 px-8 py-2 bg-slate-400 rounded-lg font-bold text-lg hover:bg-slate-600 hover:text-slate-400">
          + New
        </div>
      </Link>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie)
  const { accessToken, userId } = cookies

  const response = await fetch(
    `https://celebal-tech-blog-backend-msz9rhal0-sonelashutosh.vercel.app/blogs/users/${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  )
  const userBlogs = await response.json()

  return {
    props: {
      data: userBlogs,
    },
  }
}
