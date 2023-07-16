import BlogCard from '@/components/BlogCard'

export default function Index({ data }) {
  const { blogs } = data
  // console.log(blogs)
  return (
    <div className="mx-40 h-[85vh] p-4 overflow-y-auto">
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
