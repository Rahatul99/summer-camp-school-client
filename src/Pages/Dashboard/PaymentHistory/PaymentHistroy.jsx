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
      <h1 className="text-xl font-bold mb-4">Payment History</h1>
      <div className="overflow-x-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Class ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Course ID</th>
              <th className="px-4 py-2">Available Seats</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((item, index) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.transactionId}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.classId[0]}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">{item.courseId[0]}</td>
                <td className="border px-4 py-2">{item.availableSeats[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
