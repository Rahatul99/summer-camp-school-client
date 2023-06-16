import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useInstructorsData = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (instructors.length === 0) {
          const response = await axiosSecure.get('/users/instructors');
          setInstructors(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching instructors:', error);
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [axiosSecure, instructors.length]);

  return [instructors, loading];
};

export default useInstructorsData;
