import { useState } from "react";

const Classes = ({user}) => { //todo user have to remove from here
    const classesData = [
        {
            id: 1,
            name: "Beginner Swimming",
            image: "class_beginner_swimming.jpg",
            students: 35
        },
        {
            id: 2,
            name: "Advanced Techniques",
            image: "class_advanced_techniques.jpg",
            students: 28
        },
        {
            id: 3,
            name: "Water Aerobics",
            image: "class_water_aerobics.jpg",
            students: 42
        },
        {
            id: 4,
            name: "Swimming for Kids",
            image: "class_swimming_for_kids.jpg",
            students: 48
        },
        {
            id: 5,
            name: "Competitive Swimming",
            image: "class_competitive_swimming.jpg",
            students: 39
        },
        {
            id: 6,
            name: "Stroke Correction",
            image: "class_stroke_correction.jpg",
            students: 33
        }
    ];



    // const { user, isAdmin } = (null);
    const [selectedClass, setSelectedClass] = useState(null);
    console.log(selectedClass);

    const handleSelectClass = (classId) => {
      if (!user) {
        alert('Please log in before selecting a course.');
        // Navigate
      }
  
      if (isAdmin) {
        alert('You cannot select this class as an admin or instructor.');
        return;
      }
  
      setSelectedClass(classId);
    }  

        return (
            <>
                <div className="md:w-4/12 mx-auto text-center pt-[60px] mb-5">
                    <h3 className="text-4xl font-bold uppercase border-b-4 border-yellow-500 inline-block py-2 px-4 tracking-wider">
                        Classes
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6 ml-5 mr-5 mb-5">
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
                                disabled={course.availableSeats === 0 || isAdmin }
                                onClick={() => handleSelectClass(course.id)}
                                >
                                    Select
                                </button>
                                )
                                :
                                (
                                <button 
                                className="btn toggle-button font-bold py-2 px-4 rounded-full"
                                disabled
                                onClick={() => handleSelectClass(course.id)}>
                                    Select
                                </button>)
                            }
                        </div>
                    //  )) 
                    )}
                </div>
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
