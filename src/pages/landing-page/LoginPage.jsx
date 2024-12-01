import { useState } from 'react';
import NavbarLanding from '../../components/landingpage/NavbarLanding';
import LoginImage from '../../assets/img/donate.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // for navigation after login success

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);  // Start loading

    const formElements = e.target.elements;
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
    };

    try {
      // Send POST request to login API
      const response = await axios.post("http://localhost:8085/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        
        alert("Login successful!");
        setTimeout(() => {      
      
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          

          if (response.data.user.role === 'pengguna') {       
            console.log('hi');
                 
            navigate("/home");
          } else if (response.data.user.role === 'lembaga sosial') {
            navigate("/lembaga-sosial");
          } else if (response.data.user.role === 'mitra') {
            navigate("/mitra");
          } else if (response.data.user.role === 'admin') {
            navigate("/admin");
          }
      
        }, 500);         
      } else {
        setError("Login failed, please check your credentials.");
      }
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error during login:", error);
      setLoading(false);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>
      <NavbarLanding />
      <section className="pt-24 min-h-screen flex items-center justify-center py-10">
        <div className="p-5 max-w-3xl shadow-lg bg-gray-100 flex rounded-2xl items-center">
          <div className='md:w-1/2 px-16'>
            <h2 className='font-bold text-2xl text-[#45c517]'>Login</h2>

            <p className='text-sm mt-4 text-[#45c517]'>If You Already A Member, Easily Log In</p>

            {/* Show error message if any */}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <input className='p-2 rounded-xl mt-8 border' type="email" name="email" placeholder='Email' required />
              <div className='relative'>
                <input
                  className='p-2 rounded-xl border w-full'
                  type="password"
                  name="password"
                  placeholder='Password'
                  required
                />
              </div>
              <button
                className='bg-[#45c517] rounded-xl py-2 text-white hover:scale-105 duration-300 text-center'
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className='mt-10 grid grid-cols-3 items-center text-gray-500'>
              <hr className='border-gray-500' />
              <p className='text-center text-sm'>OR</p>
              <hr className='border-gray-500' />
            </div>

            <button className='hover:scale-105 duration-300 bg-white border py-2 w-full rounded-xl text-sm mt-5 flex justify-center items-center'>
              <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              Login with Google
            </button>

            <p className='mt-5 text-xs border-b py-4 border-gray-400'>Forgot your password?</p>

            <div className='mt-3 text-xs flex justify-between items-center'>
              <p>Don`t have an account?</p>
              <Link to="/register"><button className='py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300'>Register</button></Link>
            </div>
          </div>

          <div className='md:block hidden w-1/2'>
            <img className='rounded-2xl' src={LoginImage} alt="Login Illustration" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
