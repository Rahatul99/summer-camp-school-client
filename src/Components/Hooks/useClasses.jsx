import { useEffect } from "react";
import { useState } from "react";

const useClasses = () => {
    const [classesData, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://summer-camp-school-server-rahatul99.vercel.app/classes')
        .then(res => res.json())
        .then(data => {
            setClasses(data)
            setLoading(false)
        })
    }, [])
    return [classesData, loading];
};

export default useClasses;
