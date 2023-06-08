import useClasses from "../../../Components/Hooks/useClasses";
import SectionTitle from "../../../Components/SectionTitle";

const PopularClassesSection = () => {
  const [classesData] = useClasses();

  // Sort classes based on the number of students in descending order
  const sortedClasses = classesData.sort((a, b) => b.students - a.students);

  // Get the top 6 classes
  const topClasses = sortedClasses.slice(0, 6);

  return (
    <section>
      <SectionTitle title="Popular Classes" />
      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 ml-5 mr-5 mb-5">
        {topClasses.map((classItem) => (
          <div key={classItem.id} className="card toggle-container">
            <img src={classItem.image} alt={classItem.name} className="w-full h-40 object-cover" />
            <div className="card-body">
              <h2 className="card-title">{classItem.name}</h2>
              <p>{classItem.students} Students</p>
              <button className="btn mt-4 toggle-button">See Classes</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularClassesSection;
