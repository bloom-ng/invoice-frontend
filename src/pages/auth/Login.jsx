import React from "react";
import Requests from "../../services/Requests";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";




const Login = () => {
  const {dispatch} = React.useContext(AuthContext)
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let response = await Requests.Login(email, password)      

     
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      // setSuccess(true)
      // return navigate('/invoice');
      location.reload();
      
    } catch (error) {
      alert('Login Failed')
      setLoading(false);

    }
  }


  return (
    <>
    {success && (
          <Navigate to="/" replace={true} />
        )}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to continue
            </h2>

          </div>
          <form className="mt-8 space-y-12"  onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" space-y-px rounded-md shadow-sm">
              <div className="py-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className=" items-center justify-between hidden">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-orange-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >

                 {loading ? "Signing In" : "Sign in"} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
