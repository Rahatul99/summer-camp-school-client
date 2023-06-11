import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import useInstructorsData from "../../../Components/Hooks/useInstructorsData";
import useAuth from "../../../Components/Hooks/useAuth";


const AddClass = () => {
    const { register, handleSubmit, reset } = useForm();

    //-----------------------------------------//
    const { user } = useAuth();
    const [instructors] = useInstructorsData();

    const instructor = instructors.find((instructor) => instructor.email === user.email);
    console.log(instructor, '----------------sadj');


    //--------------------------------------//

    const onSubmit = (data) => {
        // Create class in the database with the form values
        console.log(data);
        const newClass = {
            className: data.className,
            classImage: data.classImage,
            // instructorName: instructor.displayName,
            // instructorEmail: instructor.email,
            availableSeats: data.availableSeats,
            price: data.price,
            status: 'pending',
        };

        // TODO: Submit the newClass object to the server or perform other actions

        // Reset form fields
        reset();
    };
    return (
        <div className="w-full">
            <SectionTitle title="Add A Class"></SectionTitle>



            <div className="max-w-md mx-auto mt-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <label htmlFor="className" className="block text-sm font-medium text-gray-200">
                            Class name
                        </label>
                        <input
                            type="text"
                            id="className"
                            {...register('className', { required: true })}
                            className="mt-1 input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="classImage" className="block text-sm font-medium text-gray-200">
                            Class Image
                        </label>
                        {/* <input
                            type="text"
                            id="classImage"
                            {...register('classImage', { required: true })}
                            className="mt-1 input input-bordered w-full"
                        /> */}

                        <input {...register('classImage', { required: true })} type="file" className="file-input file-input-bordered file-input-success w-full" />
                    </div>
                    <div>
                        <label htmlFor="instructorName" className="block text-sm font-medium text-gray-200">
                            Instructor name
                        </label>
                        <input
                            type="text"
                            id="instructorName"
                            value={instructor?.name}
                            placeholder={instructor?.name}
                            readOnly
                            className="mt-1 input input-bordered w-full cursor-not-allowed text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="instructorEmail" className="block text-sm font-medium text-gray-200">
                            Instructor email
                        </label>
                        <input
                            type="text"
                            id="instructorEmail"
                            value={instructor?.email}
                            placeholder={instructor?.email}
                            readOnly
                            className="mt-1 input input-bordered w-full cursor-not-allowed text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-200">
                            Available seats
                        </label>
                        <input
                            type="number"
                            id="availableSeats"
                            {...register('availableSeats', { required: true })}
                            className="mt-1 input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-200">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            {...register('price', { required: true })}
                            className="mt-1 input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn w-full toggle-button font-bold py-2 px-4 rounded-full"
                        // onClick={() => handleSelectClass(course.id)}
                        >
                            Add a Class
                        </button>
                    </div>
                </form>
            </div>









            {/* <div className="max-w-md mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Add a Class</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                            Class name
                        </label>
                        <input
                            type="text"
                            id="className"
                            {...register('className', { required: true })}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="classImage" className="block text-sm font-medium text-gray-700">
                            Class Image
                        </label>
                        <input
                            type="text"
                            id="classImage"
                            {...register('classImage', { required: true })}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700">
                            Instructor name
                        </label>
                        <input
                            type="text"
                            id="instructorName"
                            // value={instructor.displayName}
                            readOnly
                            className="mt-1 bg-gray-100 cursor-not-allowed focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="instructorEmail" className="block text-sm font-medium text-gray-700">
                            Instructor email
                        </label>
                        <input
                            type="text"
                            id="instructorEmail"
                            // value={instructor.email}
                            readOnly
                            className="mt-1 bg-gray-100 cursor-not-allowed focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
                            Available seats
                        </label>
                        <input
                            type="number"
                            id="availableSeats"
                            {...register('availableSeats', { required: true })}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            {...register('price', { required: true })}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div> */}
        </div>
    );
};

export default AddClass;