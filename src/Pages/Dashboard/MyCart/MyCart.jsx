import { Helmet } from "react-helmet";
import useCart from "../../../Components/Hooks/useCart";
import { FaDollarSign, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCart = () => {
    const [carts, , refetch] = useCart();
    console.log(carts);
    const total = carts.reduce((sum, item) => item.price + sum, 0)

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
                fetch(`http://localhost:5000/carts/${course._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
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
                    Total Items: <span className="text-primary">{carts.length}</span> &nbsp;&nbsp;|&nbsp;&nbsp; Total Price: <span className="text-primary">${total}</span>
                </h3>
                <button className="btn btn-primary btn-sm mt-4">
                    <FaDollarSign className="w-4 h-4 mr-2" />
                    Pay Now
                </button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map((course, index) => <tr key={course._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={course.courseImage} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {course.courseName}
                                </td>
                                <td className="text-center">${course.price}</td>
                                <td>
                                    <button onClick={() => handleDelete(course)} className="btn btn-ghost btn-md bg-red-700"><FaTrash /></button>
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












// import { Helmet } from "react-helmet";
// import useCart from "../../../Components/Hooks/useCart";

// const MyCart = () => {
//     const [cart] = useCart();
//     console.log(cart);
//     const total = cart.reduce((sum, item) => item.price + sum, 0);

//     return (
//         <div>
//             <Helmet>
//                 <title>Dive-In Delight | MyCart</title>
//             </Helmet>
//             <div className="uppercase">
//                 {/* <h3 className="text-3xl font-bold mb-4">Total Items: <span className="text-primary">{cart.length}</span></h3>
//         <h3 className="text-3xl font-bold mb-4">Total Price: <span className="text-primary">${total}</span></h3> */}

//                 <h3 className="text-3xl font-bold mb-4">
//                     Total Items: <span className="text-primary">{cart.length}</span> &nbsp;&nbsp;|&nbsp;&nbsp; Total Price: <span className="text-primary">${total}</span>
//                 </h3>
//                 <button className="btn btn-primary btn-sm mt-4">
//                     <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                         <path
//                             fillRule="evenodd"
//                             d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1z"
//                             clipRule="evenodd"
//                         ></path>
//                     </svg>
//                     Pay Now
//                 </button>
//             </div>
//             <table className="table w-full mt-8">
//                 <thead>
//                     <tr>
//                         <th className="border-b">Product</th>
//                         <th className="border-b">Price</th>
//                         <th className="border-b">Quantity</th>
//                         <th className="border-b">Subtotal</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* Render cart items */}
//                     {cart.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.productName}</td>
//                             <td>${item.price}</td>
//                             <td>{item.quantity}</td>
//                             <td>${item.price * item.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default MyCart;

