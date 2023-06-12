// import { useEffect } from "react";
// import { useState } from "react";

// const useInstructors = () => {
//     const [instructors, setInstructors] = useState([]);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         fetch('https://summer-camp-school-server-rahatul99.vercel.app/instructors')
//         .then(res => res.json())
//         .then(data => {
//             setInstructors(data)
//             setLoading(false)
//         })
//     }, [])
//     return [instructors, loading];
// };

// export default useInstructors;




// import { useEffect, useState } from 'react';
// import useAxiosSecure from './useAxiosSecure';

// const useInstructorsData = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [axiosSecure] = useAxiosSecure();

//   useEffect(() => {
//     const fetchInstructors = async () => {
//       try {
//         const response = await axiosSecure.get('/users/instructors');
//         setInstructors(response.data);
//       } catch (error) {
//         console.error('Error fetching instructors:', error);
//       }
//     };

//     fetchInstructors();
//   }, [axiosSecure]);

//   return [instructors];
// };

// export default useInstructorsData;














// import { useEffect, useState } from 'react';
// import useAxiosSecure from './useAxiosSecure';

// const useInstructorsData = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [axiosSecure] = useAxiosSecure();

//   useEffect(() => {
//     const fetchInstructors = async () => {
//       try {
//         const response = await axiosSecure.get('/users/instructors');
//         setInstructors(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching instructors:', error);
//         setLoading(false);
//       }
//     };

//     fetchInstructors();
//   }, [axiosSecure]);

//   return [instructors, loading];
// };

// export default useInstructorsData;



















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
