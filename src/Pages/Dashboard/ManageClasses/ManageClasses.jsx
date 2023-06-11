// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
// import Swal from 'sweetalert2';

// const ManageClasses = () => {
//     const [axiosSecure] = useAxiosSecure();

//     const { data: classes = [], refetch } = useQuery(['classes'], async () => {
//         const res = await axiosSecure.get('/classes')
//         return res.data;
//     })

//   const handleApprove = (classId) => {
//     fetch(`http://localhost:5000/classes/approved/${classId}`, {
//         method: 'PATCH'
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             if (data.modifiedCount) {
//                 refetch();
//                 Swal.fire({
//                     position: 'top-end',
//                     icon: 'success',
//                     title: `${user.name} is an Admin Now!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                 })
//             }
//         })
// }
//     Swal.fire({
//       title: 'Approve Class',
//       text: 'Implement your approve logic here',
//       icon: 'success',
//     });
//   };

//   const handleDeny = (classId) => {
//     // Implement the logic to deny the class based on the classId
//     // Update the status to 'denied' and disable the approve and deny buttons
//     // For example:
//     Swal.fire({
//       title: 'Deny Class',
//       text: 'Implement your deny logic here',
//       icon: 'error',
//     });
//   };

//   const handleSendFeedback = (classId) => {
//     // Implement the logic to send feedback to the instructor for the class
//     // Open a modal or a form to input and send the feedback
//     // For example:
//     Swal.fire({
//       title: 'Send Feedback',
//       text: 'Implement your feedback form here',
//       icon: 'info',
//     });
//   };

//   return (
//     <div className="w-full">
//       <h2 className="text-xl font-bold mb-4">Manage Classes</h2>

//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Class Image
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Class name
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Instructor name
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Instructor email
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Available seats
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {classes.map((classItem) => (
//               <tr key={classItem._id}>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   <img
//                     src={classItem.image}
//                     alt={classItem.className}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {classItem.className}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {classItem.instructorName}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {classItem.instructorEmail}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {classItem.availableSeats}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {classItem.price}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {classItem.status}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {classItem.status === 'pending' && (
//                     <>
//                       <button
//                         onClick={() => handleApprove(classItem._id)}
//                         className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mr-2"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleDeny(classItem.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
//                       >
//                         Deny
//                       </button>
//                     </>
//                   )}
//                   {classItem.status !== 'pending' && (
//                     <button
//                       onClick={() => handleSendFeedback(classItem.id)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
//                     >
//                       Send Feedback
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ManageClasses;

































import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery(['classes'], async () => {
    const res = await axiosSecure.get('/classes');
    return res.data;
  });

  const handleApprove = (classId) => {
    fetch(`http://localhost:5000/classes/approved/${classId}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Class Approved!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDeny = (classId) => {
    fetch(`http://localhost:5000/classes/denied/${classId}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Class Denied!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleSendFeedback = (classId) => {
    // Implement the logic to send feedback to the instructor for the class
    // Open a modal or a form to input and send the feedback
    // For example:
    Swal.fire({
      title: 'Send Feedback',
      text: 'Implement your feedback form here',
      icon: 'info',
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Manage Classes</h2>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Class Image</th>
            <th>Class name</th>
            <th>Instructor name</th>
            <th>Instructor email</th>
            <th>Available seats</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>
                <img
                  src={classItem.image}
                  alt={classItem.className}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{classItem.className}</td>
              <td>{classItem.instructorName}</td>
              <td>{classItem.instructorEmail}</td>
              <td>{classItem.availableSeats}</td>
              <td>{classItem.price}</td>
              <td>{classItem.status}</td>
              <td>
                {classItem.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(classItem._id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeny(classItem._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                    >
                      Deny
                    </button>
                  </>
                )}
                {classItem.status !== 'pending' && (
                  <button
                    onClick={() => handleSendFeedback(classItem._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                  >
                    Send Feedback
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;
