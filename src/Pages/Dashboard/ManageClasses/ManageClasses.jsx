import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery(['classes'], async () => {
    const res = await axiosSecure.get('/classes');
    return res.data;
  });

  const handleApprove = async (classId) => {
    await axiosSecure.patch(`/classes/approved/${classId}`)
      .then((data) => {
        if (data.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Class Approved!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
  }

  const handleDeny = async (classId) => {
    await axiosSecure.patch(`/classes/deny/${classId}`)
      .then((data) => {
        if (data.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Class Denied!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
  }

  const handleSendFeedback = (classId) => {
    Swal.fire({
      title: 'Submit your feedback',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Send Feedback',
      showLoaderOnConfirm: true,
      preConfirm: async (value) => {
        try {
          const response = await axiosSecure.post(`/classes/feedback/${classId}`, { feedback: value });
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error(response.statusText);
          }
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Feedback Sent!',
          text: 'Your feedback has been successfully submitted.',
          icon: 'success',
        });
        refetch();
      }
    });
  };

  return (
    <div className=" text-center w-full p-5">

      <Helmet>
        <title>Dive-In Delight | Manage Classes</title>
      </Helmet>
      <div className="mx-auto text-center mb-5">
        <h3 className="text-4xl font-bold uppercase border-b-4 border-orange-400 inline-block py-2 px-4 tracking-wider">
          Manage Classes
        </h3>
      </div>

      <table className="min-w-full bg-gray-900 text-white">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-gray-800 border-b font-bold">Class Image</th>
            <th className="py-3 px-4 bg-gray-800 border-b font-bold">Class name</th>
            <th className="py-3 px-4 bg-gray-800 border-b font-bold">Instructor name</th>
            <th className="py-3 px-4 bg-gray-800 border-b font-bold">Instructor email</th>
            <th className="py-3 px-4 bg-gray-800 border-b font-bold">Available seats</th>
            <th className="py-3 px-4 bg-gray-800 border-b font-bold">Price</th>
            <th className="py-3 px-4 bg-gray-800 border-b font-bold">Status</th>
            <th className="py-3 px-4 bg-gray-800 border-b font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id} className="border-b">
              <td className="py-4 px-4">
                <img
                  src={classItem.image}
                  alt={classItem.className}
                  className="object-cover mask mask-squircle w-12 h-12"
                />
              </td>
              <td className="py-4 px-4">{classItem.className}</td>
              <td className="py-4 px-4">{classItem.instructorName}</td>
              <td className="py-4 px-4">{classItem.instructorEmail}</td>
              <td className="py-4 px-4">{classItem.availableSeats}</td>
              <td className="py-4 px-4">{classItem.price}</td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 py-2 text-center rounded ${classItem.status === 'pending' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
                    }`}
                >
                  {classItem.status}
                </span>
              </td>
              <td className="py-4 px-4">
                {classItem.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleApprove(classItem._id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full mb-2 transition-colors duration-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeny(classItem._id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-3 transition-colors duration-300"
                    >
                      Deny
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleSendFeedback(classItem._id)}
                    className="btn toggle-button font-bold py-2 px-4 rounded-full"
                  >
                    Feedback
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