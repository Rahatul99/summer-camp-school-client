import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaChalkboardTeacher, FaTrash, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })


    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }


    const handleMakeInstructor = (user) => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        });
    };
    return (
        <>
            <Helmet>
                <title>Dive-In Delight | All users</title>
            </Helmet>
            <div className="uppercase flex flex-col items-center my-5">
                <h3 className="text-3xl font-bold mb-4">
                    Total Users: <span className="text-primary">{users.length}</span>
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'admin' : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-ghost bg-green-600 text-white"
                                        >
                                            <FaUserShield />
                                        </button>
                                    )}
                                </td>
                                {/* <td>
                                    {user.role === 'admin' ? 'instructor' : (
                                        <button
                                            onClick={() => handleMakeInstructor(user)}
                                            className="btn btn-ghost bg-green-600 text-white"
                                        >
                                            <FaChalkboardTeacher />
                                        </button>
                                    )}
                                </td> */}

                                <td>
                                    {user.role === 'admin' ? (
                                        'admin'
                                    ) : user.role === 'instructor' ? (
                                        'instructor'
                                    ) : (
                                        <button
                                            onClick={() => handleMakeInstructor(user)}
                                            className="btn btn-ghost bg-green-600 text-white"
                                        >
                                            <FaChalkboardTeacher />
                                        </button>
                                    )}
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-ghost bg-red-600 text-white"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllUsers;