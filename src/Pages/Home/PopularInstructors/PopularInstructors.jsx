import SectionTitle from "../../../Components/SectionTitle";
import { useState } from "react";
import Modal from './Modal';
import { SyncLoader } from 'react-spinners';
import useInstructorsData from "../../../Components/Hooks/useInstructorsData";

const PopularInstructors = () => {
  const [instructors, loading] = useInstructorsData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);

  const popularInstructors = instructors.sort((a, b) => b.classesTaken - a.classesTaken).slice(0, 6);

  const handleViewDetails = (instructorId) => {
    setSelectedInstructorId(instructorId);
    setModalOpen(true);
  };

  return (
    <>
      <SectionTitle title="Popular Instructors" />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 ml-5 mr-5 mb-5">
          {popularInstructors.map((instructor) => (
            <div key={instructor._id} className="card shadow-md p-4 rounded-lg toggle-container">
              <img src={instructor.photoURL} alt={instructor.name} className="rounded-lg mb-4" />
              <h2 className="text-xl font-bold mb-2">{instructor.name}</h2>
              <p className="mb-2">{instructor.email}</p>
              {instructor?.classesTaken && (
                <p className="mb-2">Classes Taken: {instructor?.classesTaken}</p>
              )}
              {instructor.classes && (
                <p className="mb-4">Classes: {instructor?.classes.join(', ')}</p>
              )}
              <button
                onClick={() => handleViewDetails(instructor._id)}
                className="btn toggle-button font-bold py-2 px-4 rounded-full"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        instructorId={selectedInstructorId}
      />
    </>
  );
};

export default PopularInstructors;
