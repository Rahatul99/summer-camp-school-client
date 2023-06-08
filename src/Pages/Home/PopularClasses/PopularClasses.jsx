import SectionTitle from "../../../Components/SectionTitle";

const PopularClassesSection = () => {
  const classesData = [
    {
        id: 1,
        name: "Beginner Swimming",
        image: "class_beginner_swimming.jpg",
        students: 35
    },
    {
        id: 2,
        name: "Advanced Techniques",
        image: "class_advanced_techniques.jpg",
        students: 28
    },
    {
        id: 3,
        name: "Water Aerobics",
        image: "class_water_aerobics.jpg",
        students: 42
    },
    {
        id: 4,
        name: "Swimming for Kids",
        image: "class_swimming_for_kids.jpg",
        students: 48
    },
    {
        id: 5,
        name: "Competitive Swimming",
        image: "class_competitive_swimming.jpg",
        students: 39
    },
    {
        id: 6,
        name: "Stroke Correction",
        image: "class_stroke_correction.jpg",
        students: 33
    }
];

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
