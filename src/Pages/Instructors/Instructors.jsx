import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import useInstructorsData from '../../Components/Hooks/useInstructorsData';

const Instructors = () => {
  // const [instructors, loading] = useInstructors();
  const [instructors, loading] = useInstructorsData()
  return (
    <>
      <Helmet>
        <title>Dive-In Delight | Instructors</title>
      </Helmet>

      <div className="md:w-4/12 mx-auto text-center pt-[60px] mb-5">
        <h3 className="text-4xl font-bold uppercase border-b-4 border-yellow-500 inline-block py-2 px-4 tracking-wider">
          Instructors
        </h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="#36d7b7" />
        </div>)
        :
        (
          <div className="grid md:grid-cols-3 gap-6 ml-5 mr-5 mb-5">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="card shadow-md p-4 rounded-lg toggle-container">
                <img src={instructor.photoURL} alt={instructor.name} className="rounded-lg mb-4" />
                <h2 className="text-xl font-bold mb-2">{instructor.name}</h2>
                <p className=" mb-2">{instructor.email}</p>
                {instructor.classesTaken && (
                  <p className=" mb-2">Classes Taken: {instructor.classesTaken}</p>
                )}
                {instructor.classes && (
                  <p className="mb-4">Classes: {instructor.classes.join(', ')}</p>
                )}
                <Link
                  to={`/instructors/${instructor.id}`}
                  className="btn toggle-button font-bold py-2 px-4 rounded-full"
                >
                  See Classes
                </Link>
              </div>
            ))}
          </div>
        )
      }
    </>
  );
};

export default Instructors;


