import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useClasses from "../../Components/Hooks/useClasses";
import { SyncLoader } from 'react-spinners';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../Components/Hooks/useCart";
import useAuth from "../../Components/Hooks/useAuth";
import useAdmin from "../../Components/Hooks/useAdmin";
import useInstructor from "../../Components/Hooks/useInstructor";

const Classes = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [classesData, loading] = useClasses();
    const [, refetch] = useCart();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const [selectedClass, setSelectedClass] = useState(null);
    console.log(selectedClass);

    const handleSelectClass = (course) => {
        const { _id, name, price, availableSeats, instructor, image } = course;
        if (user && user.email) {
            const bookedCourse = { courseId: _id, courseName: name, price, availableSeats, studentEmail: user.email, instructor, courseImage: image }

            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bookedCourse)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${name} this class booked successfully`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to book the classes',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }


        setSelectedClass(course);
        if (isAdmin) {
            alert('You cannot select this class as an admin or instructor.');
            return;
        }
    }

    return (
        <>
            <Helmet>
                <title>Dive-In Delight | Classes</title>
            </Helmet>

            <div className="md:w-4/12 mx-auto text-center pt-[80px] mb-5">
                <h3 className="text-4xl font-bold uppercase border-b-4 border-yellow-500 inline-block py-2 px-4 tracking-wider">
                    Classes
                </h3>
            </div>

            {loading ?
                (<div className="flex items-center justify-center h-screen">
                    <SyncLoader color="#36d7b7" />
                </div>)
                :
                (<div className="grid md:grid-cols-3 gap-6 ml-5 mr-5 mb-5">
                    {classesData.map((course) =>
                        <div
                            key={course.id}
                            className={`card shadow-md p-4 rounded-lg toggle-container ${course.availableSeats === 0 ? 'bg-red-500' : ''}`}
                        >
                            <img src={course.image} alt={course.name} className="rounded-lg mb-4" />
                            <h2 className="text-xl font-bold mb-2">{course.name}</h2>
                            <p className="mb-2">Instructor: {course.instructor}</p>
                            <p className="mb-2">Available Seats: {course.availableSeats}</p>
                            <p className="mb-2">Price: ${course.price}</p>
                            {user ? (
                                <button
                                    className="btn toggle-button font-bold py-2 px-4 rounded-full"
                                    disabled={course.availableSeats === 0
                                        || isAdmin || isInstructor
                                    }
                                    onClick={() => handleSelectClass(course)}
                                >
                                    Select
                                </button>
                            )
                                :
                                (
                                    <button
                                        className="btn toggle-button font-bold py-2 px-4 rounded-full"
                                        onClick={() => handleSelectClass(course.id)}>
                                        Select
                                    </button>)
                            }
                        </div>
                    )}
                </div>)
            }
        </>
    );
};

export default Classes;























//     import { useState } from 'react';

// const classes = [
//   {
//     id: 1,
//     name: 'Beginner Swimming',
//     instructor: 'Emma Johnson',
//     image: 'class_swimming.jpg',
//     availableSeats: 5,
//     price: 29.99,
//   },
//   // Add more classes...
// ];

// const Classes = ({ isLoggedIn, isAdmin, instructorId }) => {
//   const [selectedClass, setSelectedClass] = useState(null);

//   const handleSelectClass = (classId) => {
//     if (!isLoggedIn) {
//       alert('Please log in before selecting a course.');
//       return;
//     }

//     if (isAdmin || instructorId === classId) {
//       alert('You cannot select this class as an admin or instructor.');
//       return;
//     }

//     setSelectedClass(classId);
//   };

//   return (
//     <>
//       <h1 className="text-3xl font-bold mb-5 ml-5">Classes</h1>
//       <div className="grid md:grid-cols-3 gap-6 ml-5 mr-5 mb-5">
//         {classes.map((course) => (
//           <div
//             key={course.id}
//             className={`card shadow-md p-4 rounded-lg toggle-container ${
//               course.availableSeats === 0 ? 'bg-red-100' : ''
//             }`}
//           >
//             <img src={course.image} alt={course.name} className="rounded-lg mb-4" />
//             <h2 className="text-xl font-bold mb-2">{course.name}</h2>
//             <p className="mb-2">Instructor: {course.instructor}</p>
//             <p className="mb-2">Available Seats: {course.availableSeats}</p>
//             <p className="mb-2">Price: ${course.price}</p>
//             {isLoggedIn ? (
//               <button
//                 className="btn toggle-button font-bold py-2 px-4 rounded-full"
//                 disabled={course.availableSeats === 0 || isAdmin || instructorId === course.id}
//                 onClick={() => handleSelectClass(course.id)}
//               >
//                 Select
//               </button>
//             ) : (
//               <p className="text-red-500">
//                 Please log in before selecting a course.
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Classes;
