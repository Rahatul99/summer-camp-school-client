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
    <div>
      <h1 className="text-xl font-bold mb-4">Enrolled Classes</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {enrolledClasses.map((classItem, index) => (
            <tr key={classItem._id}>
              <td>{index + 1}</td>
              <td>{classItem.className}</td>
              <td>{classItem.date}</td>
              <td>{classItem.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrolledClasses;

