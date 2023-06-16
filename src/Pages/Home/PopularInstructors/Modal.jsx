import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SyncLoader } from 'react-spinners';

const Modal = ({ isOpen, onClose, instructorId }) => {
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://summer-camp-school-server-rahatul99.vercel.app/users/instructors/${instructorId}`)
      .then(res => res.json())
      .then(data => {
        setInstructor(data)
        setLoading(false)
      })
  }, [isOpen, instructorId])

  return (
    <Transition show={isOpen}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {instructor ? (
                <div>
                  <div className="flex flex-col items-center mb-6">
                    <img
                      className="w-32 h-32 rounded-full mb-4"
                      src={instructor.photoURL}
                      alt={instructor.name}
                    />
                    <h2 className="text-xl font-bold mb-2">{instructor.name}</h2>
                    <p>Email: {instructor.email}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">About</h3>
                    <p>
                      {/* {instructor.about} */}
                      </p>
                  </div>
                  {/* <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Client Opinions</h3>
                    {instructor.clientOpinions.map((opinion, index) => (
                      <div key={index} className="mb-2">
                        <p className="font-bold">{opinion.name}</p>
                        <p>{opinion.opinion}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Skills</h3>
                    <ul className="list-disc pl-6">
                      {instructor.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Achievements</h3>
                    <ul className="list-disc pl-6">
                      {instructor.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div> */}
                </div>
              ) : (
                <p>{loading ? <SyncLoader color="#36d7b7"/> : ''}</p>
              )}

              <button
                onClick={onClose}
                className="btn toggle-button font-bold py-2 px-4 rounded-full mt-6"
              >
                Close
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

