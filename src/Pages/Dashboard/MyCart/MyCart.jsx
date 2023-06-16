import { Helmet } from "react-helmet";
import useCart from "../../../Components/Hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [carts, refetch] = useCart();
    console.log(carts,'myCart');
    const total = carts?.reduce((sum, item) => item.price + sum, 0)

    const handleDelete = (course) => {
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
                fetch(`https://summer-camp-school-server-rahatul99.vercel.app/carts/${course._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your course has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        });
    };

    return (
        <div className="my-5">
            <Helmet>
                <title>Dive-In Delight | MyCart</title>
            </Helmet>
            <div className="uppercase flex flex-col items-center my-5">
                <h3 className="text-3xl font-bold mb-4">
                    Total Items: <span className="text-primary">{carts?.length}</span> &nbsp;&nbsp;|&nbsp;&nbsp; Total Price: <span className="text-primary">${total}</span>
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-center">
                        <tr>
                            <th>#</th>
                            <th>Courses</th>
                            <th>Courses Name</th>
                            <th>Courses Price</th>
                            <th>Action</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts?.map((course, index) => <tr key={course._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={course?.courseImage} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-white">
                                    {course.courseName}
                                </td>
                                <td className="text-center">${course?.price}</td>
                                <td>
                                    <button onClick={() => handleDelete(course)} className="btn btn-ghost btn-md bg-red-700"><FaTrash /></button>
                                </td>
                                <td>
                                    <Link
                                        to="/dashboard/payment" state={course}
                                        className="btn btn-ghost btn-md bg-green-500 text-white"
                                    >
                                        Pay Now
                                    </Link>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyCart;