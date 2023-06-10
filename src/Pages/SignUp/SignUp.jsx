import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';


const SignUp = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const { createUser, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, photoURL: data.photoUrl }

                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => setError(error))
            })
    }



    const password = watch('password');


    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1464925257126-6450e871c667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80")` }}>

            <Helmet>
                <title>Dive-In Delight | SignUp</title>
            </Helmet>

            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content w-[100%] flex-col lg:flex-row-reverse mt-[55px]">
                <div className="card flex-shrink-0 w-[40%] shadow-2xl glass">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Registration</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    placeholder="name"
                                    className="input input-bordered text-white"
                                />
                                {errors.name && <span className="text-red-600">Name field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered text-white"
                                />
                                {errors.email && <span className="text-red-600">Email field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/ })}
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered text-white"
                                />

                                {errors.password?.type === 'required' && <span className="text-red-600">Password field is required</span>}

                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}

                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password should not be more then 20 characters</span>}

                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password should contain at least one special character,one capital letter</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => value === password || "Passwords do not match"
                                    })}
                                    type="password"
                                    placeholder="confirm password"
                                    className="input input-bordered text-white"
                                />
                                {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}

                                {errors.confirmPassword?.type === 'required' && <span className="text-red-600">Confirm Password field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    {...register("photoUrl", { required: true })}
                                    type="text"
                                    placeholder="photo URL"
                                    className="input input-bordered text-white"
                                />
                                {errors.photoUrl && <span className='text-red-600'>Photo Url is required</span>}
                            </div>

                            <p className='text-red-400'>
                                {error}
                            </p>
                            <div className="form-control mt-6">
                                <input className="btn btn-block hover:bg-orange-600 border-none translate-x-2 transition duration-500 text-slate-200" type="submit" value="Register" />
                            </div>
                        </form>

                        <p className="my-4 text-center text-slate-200">
                            Already have an account?{' '}
                            <Link className="text-orange-600 font-bold" to="/login">
                                Login
                            </Link>
                        </p>
                        <div className="divider text-slate-200">Or login with</div>
                        <div className="mt-6">
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
