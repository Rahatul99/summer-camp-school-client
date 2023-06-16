import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import useAuth from '../../../Components/Hooks/useAuth';

const EnrolledClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const response = await axiosSecure.get('/payments');
        const filteredClasses = response.data.filter(
          (classItem) => classItem?.email === user?.email
        );
        setEnrolledClasses(filteredClasses);
      } catch (error) {
        console.error('Error fetching enrolled classes:', error);
      }
    };

    fetchEnrolledClasses();
  }, [axiosSecure, user.email]);

  return (
    <div className='p-5 w-full'>
      <div className="mx-auto text-center my-8">
        <h3 className="text-4xl font-bold uppercase border-b-4 border-orange-400 inline-block py-2 px-4 tracking-wider">
        Enrolled Classes
        </h3>
      </div>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-700 text-green-500">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Class Name</th>
            <th className="px-4 py-2">Date</th>
            {/* <th className="px-4 py-2">Status</th> */}
          </tr>
        </thead>
        <tbody className='text-black text-center'>
          {enrolledClasses.map((classItem, index) => (
            <tr key={classItem._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{classItem.classesName}</td>
              <td className="border px-4 py-2">{classItem.date}</td>
              {/* <td className="border px-4 py-2">{classItem.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrolledClasses;

