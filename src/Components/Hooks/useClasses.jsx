import { useEffect, useState } from "react";

const useClasses = () => {
  const [classesData, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://summer-camp-school-server-rahatul99.vercel.app/classes")
      .then((res) => res.json())
      .then((data) => {
        const approvedClasses = data.filter((classItem) => classItem.status === "approved");
        setClasses(approvedClasses);
        setLoading(false);
      });
  }, []);

  return [classesData, loading];
};

export default useClasses;
