import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import useAuth from '../../../Components/Hooks/useAuth';
import SectionTitle from '../../../Components/SectionTitle';
import Swal from 'sweetalert2';

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: instructorClasses = [], isLoading, refetch } = useQuery({
    queryKey: ['instructorClasses', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateClassMutation = useMutation(async (classId) => {
    const { value: updatedPrice } = await Swal.fire({
      title: 'Update Price',
      input: 'text',
      inputLabel: 'New Price',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter a valid price';
        }
      },
    });

    if (updatedPrice) {
      try {
        await axiosSecure.put(`/classes/${classId}`, { price: (updatedPrice) });
        await refetch();
        Swal.fire({
          title: 'Class Updated',
          text: 'The class has been successfully updated.',
          icon: 'success',
        });
      } catch (error) {
        console.error('Error updating class:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update the class. Please try again.',
          icon: 'error',
        });
      }
    }
  });

  const handleUpdate = (classId) => {
    updateClassMutation.mutate(classId);
  };

  return (
    <div className="text-center w-full p-5">
      <SectionTitle title="My Classes" />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-800 border-b font-bold">
                Class Name
              </th>
              <th className="py-3 px-4 bg-gray-800 border-b font-bold">
                Status
              </th>
              <th className="py-3 px-4 bg-gray-800 border-b font-bold">
                Total Enrolled Students
              </th>
              <th className="py-3 px-4 bg-gray-800 border-b font-bold">
                Feedback
              </th>
              <th className="py-3 px-4 bg-gray-800 border-b font-bold">
                Price
              </th>
              <th className="py-3 px-4 bg-gray-800 border-b font-bold">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {instructorClasses.map((classItem) => (
              <tr className="border-b" key={classItem._id}>
                <td className="py-4 px-4">{classItem.className}</td>
                <td className="py-4 px-4">{classItem.status}</td>
                <td className="py-4 px-4">{classItem?.student}</td>
                <td className="py-4 px-4">
                  {classItem.status === 'deny' ? classItem?.feedback : 'Not mentioned yet'}
                </td>
                <td className="py-4 px-4">
                  {classItem.price}
                </td>
                <td className="py-4 px-4">
                  {classItem.status !== 'pending' && (
                    <button
                      onClick={() => handleUpdate(classItem._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyClasses;

