import { Link } from "react-router-dom";
import useClasses from "../../../Components/Hooks/useClasses";
import SectionTitle from "../../../Components/SectionTitle";
import { SyncLoader } from 'react-spinners';

const PopularClassesSection = () => {
  const [classesData, loading] = useClasses();
  const sortedClasses = classesData.sort((a, b) => b.student - a.student);
  const topClasses = sortedClasses.slice(0, 6);

return (
    <section>
      <SectionTitle title="Popular Classes" />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="#36d7b7" />
        </div>
      )
        :
        (<div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 ml-5 mr-5 mb-5">
          {topClasses.map((classItem) => (
            <div key={classItem._id} className="card toggle-container">
              <img src={classItem.image} alt={classItem.className} className="w-full h-40 object-cover" />
              <div className="card-body">
                <h2 className="card-title">{classItem.className}</h2>
                <p>Students: {classItem?.student}</p>
                <p>availableSeats: {classItem?.availableSeats}</p>
                <Link to="classes" className="btn mt-4 toggle-button">See Classes</Link>
              </div>
            </div>
          ))}
        </div>)
      }
    </section>
  );
};

export default PopularClassesSection;
