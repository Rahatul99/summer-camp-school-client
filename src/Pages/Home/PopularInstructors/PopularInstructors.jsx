import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";

const PopularInstructors = () => {

  const instructors = [
    {
      "id": 1,
      "name": "Emma Johnson",
      "email": "emma.johnson@example.com",
      "image": "instructor_emma.jpg",
      "classesTaken": 8,
      "classes": ["Beginner Swimming", "Advanced Techniques", "Water Aerobics"]
    },
    {
      "id": 2,
      "name": "Michael Smith",
      "email": "michael.smith@example.com",
      "image": "instructor_michael.jpg",
      "classesTaken": 12,
      "classes": ["Swimming for Kids", "Competitive Swimming", "Stroke Correction"]
    },
    {
      "id": 3,
      "name": "Sophia Davis",
      "email": "sophia.davis@example.com",
      "image": "instructor_sophia.jpg",
      "classesTaken": 6,
      "classes": ["Water Safety", "Adult Swimming", "Open Water Training"]
    },
    {
      "id": 4,
      "name": "Daniel Wilson",
      "email": "daniel.wilson@example.com",
      "image": "instructor_daniel.jpg",
      "classesTaken": 10,
      "classes": ["Triathlon Training", "Masters Swimming", "Swim Technique"]
    },
    {
      "id": 5,
      "name": "Olivia Thompson",
      "email": "olivia.thompson@example.com",
      "image": "instructor_olivia.jpg",
      "classesTaken": 7,
      "classes": ["Aquafit", "Water Therapy", "Senior Swim Program"]
    },
    {
      "id": 6,
      "name": "Ethan Anderson",
      "email": "ethan.anderson@example.com",
      "image": "instructor_ethan.jpg",
      "classesTaken": 9,
      "classes": ["Parent and Baby", "Lifeguard Certification", "Diving Techniques"]
    }
  ];



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
