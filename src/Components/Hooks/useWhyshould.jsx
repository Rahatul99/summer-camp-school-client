import { useEffect } from "react";
import { useState } from "react";

const useWhyshould = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/whyShould')
        .then(res => res.json())
        .then(data => {
            setCardData(data)
            setLoading(false)
        })
    }, [])
    return [cardData, loading];
};

export default useWhyshould;