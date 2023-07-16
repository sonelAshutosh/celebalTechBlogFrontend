import { useRouter } from 'next/router'
import { resolve } from 'styled-jsx/css'

export default function Signup() {
  const router = useRouter()
  const handleSignup = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')

    fetch('http://localhost:5500/users/signUp', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.status === 201) router.push('/user/login')
    })
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-400">
      <div className="h-1/2 w-[80%] flex flex-col items-center justify-center bg-white rounded-md shadow-sm md:w-1/2 lg:w-1/4">
        <h1 className="m-5 font-bold text-lg">Sign Up</h1>
        <form className="flex flex-col" onSubmit={handleSignup} method="post">
          <input
            className="m-2 border border-solid border-gray-400 rounded-md p-2"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your Name"
            required
          />
          <input
            className="m-2 border border-solid border-gray-400 rounded-md p-2"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            required
          />
          <input
            className="m-2 border border-solid border-gray-400 rounded-md p-2"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            required
          />
          <button
            className="m-2 px-4 py-2 bg-green-300 rounded-lg shadow-md hover:bg-green-500"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p
          onClick={() => {
            router.push('/user/login')
          }}
          className="py-1 font-semibold cursor-pointer text-gray-400 hover:text-gray-950"
        >
          Already have a Account ?{' '}
        </p>
      </div>
    </div>
  )
}

Signup.getLayout = function PageLayout(page) {
  return <>{page} </>
}
