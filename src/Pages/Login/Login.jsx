import { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
  }





  //     signIn(email, password)
  //       .then((result) => {
  //         const user = result.user;
  //         console.log(user);
  //       })
  //       .catch((error) => {
  //         if (error.code === 'auth/user-not-found') {
  //           setError('Invalid email. Please sign up and try again.');
  //         } else {
  //           setError('Login failed. Please check your email and password.');
  //         }
  //       });
  //   };

  //   const handleGoogleLogIn = () => {
  //     googleLogin()
  //       .then((result) => {
  //         console.log(result.user);
  //       })
  //       .catch((error) => setError(error));
  //   };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1461567933755-6c82be2197da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80")` }}>
      <Helmet>
        <title>Dive-In Delight | Login</title>
      </Helmet>

      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content w-[100%] flex-col lg:flex-row-reverse mt-10">
        <div className="card flex-shrink-0 w-[40%] shadow-2xl glass">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="text"
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-600">email field is required</span>}
              </div>

              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  {...register("password", { required: true })}
                  type={showPassword ?
                    'text' : 'password'}
                  placeholder="password"
                  className="input input-bordered text-white"
                />
                {errors.password && <span className="text-red-600">password field is required</span>}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-[18px] transform -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <p className="text-red-400">
                {/* {error} */}
              </p>
              <div className="form-control mt-6">
                <input className="btn btn-block hover:bg-orange-600 border-none translate-x-2 transition duration-500 text-slate-200" type="submit" value="Login" />
              </div>
            </form>
            <p className="my-4 text-center text-slate-200">
              Don t have an account?{' '}
              <Link className="text-orange-600 font-bold" to="/signup">
                Sign Up
              </Link>
            </p>
            <div className="divider text-slate-200">Or login with</div>
            <div className="mt-6">
              <div className="flex justify-center">
                <button
                  // onClick={handleGoogleLogIn} 
                  className="btn hover:bg-orange-600 border-none translate-x-2 transition duration-500 btn-circle text-center">
                  <FaGoogle className="mr-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
