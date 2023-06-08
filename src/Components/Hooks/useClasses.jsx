import { useEffect } from "react";
import { useState } from "react";

const useClasses = () => {
    const [classesData, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/classes')
        .then(res => res.json())
        .then(data => {
            setClasses(data)
            setLoading(false)
        })
    }, [])
    return [classesData, loading];
};

export default useClasses;