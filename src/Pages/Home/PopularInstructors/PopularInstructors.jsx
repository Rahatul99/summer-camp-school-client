import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import useInstructors from "../../../Components/Hooks/useInstructors";

const PopularInstructors = () => {
  const [instructors] = useInstructors()

  // Sort instructors based on the number of students in their classes

  const popularInstructors = instructors.sort((a, b) => b.classesTaken - a.classesTaken).slice(0, 6);

  return (
    <>
      <SectionTitle title="Popular Instructors" />
        <div className="grid md:grid-cols-3 gap-6 ml-5 mr-5 mb-5">
        {popularInstructors.map((instructor) => (
          <div key={instructor.id} className="card shadow-md p-4 rounded-lg toggle-container">
            <img src={instructor.image} alt={instructor.name} className="rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">{instructor.name}</h2>
            <p className="mb-2">{instructor.email}</p>
            {instructor.classesTaken && (
              <p className="mb-2">Classes Taken: {instructor.classesTaken}</p>
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
    </>
  );
};

export default PopularInstructors;
