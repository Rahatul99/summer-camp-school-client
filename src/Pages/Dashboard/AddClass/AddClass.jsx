// import { useForm } from "react-hook-form";
// import SectionTitle from "../../../Components/SectionTitle";
// import useInstructorsData from "../../../Components/Hooks/useInstructorsData";
// import useAuth from "../../../Components/Hooks/useAuth";
// import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const img_host_token = import.meta.env.VITE_Image_token;

// const AddClass = () => {
//   const [axiosSecure] = useAxiosSecure();

//   const { register, handleSubmit, reset } = useForm();

//   const img_host_url = `https://api.imgbb.com/1/upload?key=${img_host_token}`;

//   const { user } = useAuth();
//   const [instructors] = useInstructorsData();

//   const instructor = instructors.find((instructor) => instructor.email === user.email);

//   const onSubmit = (data) => {
//     const formData = new FormData();
//     formData.append('image', data.image[0])

//     fetch(img_host_url, {
//       method: 'POST',
//       body: formData
//     })
//       .then(res => res.json())
//       .then(imgResponse => {
//         if (imgResponse.success) {
//           const imgUrl = imgResponse.data.display_url;
//           const { className, instructorName, instructorEmail, availableSeats, price } = data;
//           const newItem = {
//             className,
//             instructorName,
//             instructorEmail,
//             availableSeats: parseInt(availableSeats),
//             price: parseFloat(price),
//             image: imgUrl
//           };

//           axiosSecure.post('/classes', newItem)
//             .then(data => {
//               if (data.data.insertedId) {
//                 reset();
//                 Swal.fire({
//                   position: 'top-end',
//                   icon: 'success',
//                   title: 'New class has been added successfully',
//                   showConfirmButton: false,
//                   timer: 1500
//                 });
//               }
//             });
//         }
//       });
//   };

//   return (
//     <div className="w-full">
//       <SectionTitle title="Add A Class" />

//       <div className="max-w-md mx-auto mt-8">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//           <div className="">
//             <label className="block text-sm font-medium text-gray-200">
//               Class name
//             </label>
//             <input
//               type="text"
//               {...register('className', { required: true })}
//               className="mt-1 input input-bordered w-full"
//             />
//           </div>
//           <div className="">
//             <label className="block text-sm font-medium text-gray-200">
//               Class Image
//             </label>
//             <input
//               type="file"
//               {...register('image', { required: true })}
//               className="file-input file-input-bordered file-input-success w-full"
//             />
//           </div>
//           <div className="form-control">
//             <label className="block text-sm font-medium text-gray-200">
//               Instructor name
//             </label>
//             <input
//               type="text"
//               id="instructorName"
//               readOnly
//               value={instructor?.name}
//               className="mt-1 input input-bordered w-full cursor-not-allowed text-white"
//             />
//           </div>
//           <div className="">
//             <label className="block text-sm font-medium text-gray-200">
//               Instructor email
//             </label>
//             <input
//               type="text"
//               id="instructorEmail"
//               readOnly
//               value={instructor?.email}
//               className="mt-1 input input-bordered w-full cursor-not-allowed text-white"
//             />
//           </div>
//           <div className="">
//             <label className="block text-sm font-medium text-gray-200">
//               Available seats
//             </label>
//             <input
//               type="number"
//               id="availableSeats"
//               {...register('availableSeats', { required: true })}
//               className="mt-1 input input-bordered w-full"
//             />
//           </div>
//           <div className="">
//             <label className="block text-sm font-medium text-gray-200">
//               Price
//             </label>
//             <input
//               type="number"
//               id="price"
//               {...register('price', { required: true })}
//               className="mt-1 input input-bordered w-full"
//             />
//           </div>
//           <div className="">
//             <button
//               type="submit"
//               className="btn w-full toggle-button font-bold py-2 px-4 rounded-full"
//             >
//               Add a Class
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddClass;

















import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Components/SectionTitle';
import useInstructorsData from '../../../Components/Hooks/useInstructorsData';
import useAuth from '../../../Components/Hooks/useAuth';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { SyncLoader } from 'react-spinners';

const img_host_token = import.meta.env.VITE_Image_token;

const AddClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const [loading, setLoading] = useState(false); // Added loading state

    const { register, handleSubmit, reset } = useForm();

    const img_host_url = `https://api.imgbb.com/1/upload?key=${img_host_token}`;

    const { user } = useAuth();
    const [instructors, instructorsLoading] = useInstructorsData();

    const instructor = instructors.find((instructor) => instructor.email === user.email);

    const onSubmit = (data) => {
        setLoading(true); // Start loader
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_host_url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((imgResponse) => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url;
                    const { className, instructorName, instructorEmail, availableSeats, price } = data;
                    const newItem = {
                        className,
                        instructorName,
                        instructorEmail,
                        availableSeats: parseInt(availableSeats),
                        price: parseFloat(price),
                        image: imgUrl,
                    };

                    axiosSecure
                        .post('/classes', newItem)
                        .then((data) => {
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'New class has been added successfully',
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            }
                        })
                        .finally(() => {
                            setLoading(false); // Stop loader
                        });
                }
            });
    };

    if (instructorsLoading) {
        return <div className="flex items-center justify-center h-screen">
            <SyncLoader color="#36d7b7" />
        </div>
    }

    return (
        <div className="w-full">
            <SectionTitle title="Add A Class" />

            <div className="max-w-md mx-auto mt-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="">
                        <label className="block text-sm font-medium text-gray-200">
                            Class name
                        </label>
                        <input
                            type="text"
                            {...register('className', { required: true })}
                            className="mt-1 input input-bordered w-full"
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-200">
                            Class Image
                        </label>
                        <input
                            type="file"
                            {...register('image', { required: true })}
                            className="file-input file-input-bordered file-input-success w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-200">
                            Instructor name
                        </label>
                        <input
                            type="text"
                            id="instructorName"
                            readOnly
                            value={instructor?.name}
                            className="mt-1 input input-bordered w-full cursor-not-allowed text-white"
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-200">
                            Instructor email
                        </label>
                        <input
                            type="text"
                            id="instructorEmail"
                            readOnly
                            value={instructor?.email}
                            className="mt-1 input input-bordered w-full cursor-not-allowed text-white"
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-200">
                            Available seats
                        </label>
                        <input
                            type="number"
                            id="availableSeats"
                            {...register('availableSeats', { required: true })}
                            className="mt-1 input input-bordered w-full"
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-200">Price</label>
                        <input
                            type="number"
                            id="price"
                            {...register('price', { required: true })}
                            className="mt-1 input input-bordered w-full"
                        />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            disabled={loading} // Disable button while loading
                            className="btn w-full toggle-button font-bold py-2 px-4 rounded-full"
                        >
                            {loading ? <SyncLoader color="#36d7b7" /> : 'Add a Class'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;
