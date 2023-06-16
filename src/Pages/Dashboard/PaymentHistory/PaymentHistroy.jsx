import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import useAuth from '../../../Components/Hooks/useAuth';

const PaymentHistory = () => {
  const [axiosSecure] = useAxiosSecure();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axiosSecure.get('/payments');
        const filteredHistory = response.data.filter(
          (item) => item.email === user.email
        );
        setPaymentHistory(filteredHistory);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchPaymentHistory();
  }, [axiosSecure, user.email]);

  return (
    <div>
      <div className="mx-auto text-center my-8">
        <h3 className="text-4xl font-bold uppercase border-b-4 border-orange-400 inline-block py-2 px-4 tracking-wider">
        Payment History
        </h3>
      </div>
      <div className="p-5">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Class ID</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((course, index) => (
              <tr key={course._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{course.email}</td>
                <td className="border px-4 py-2">{course.transactionId}</td>
                <td className="border px-4 py-2">{course.price}</td>
                <td className="border px-4 py-2">{course.classId}</td>
                <td className="border px-4 py-2">{course.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
