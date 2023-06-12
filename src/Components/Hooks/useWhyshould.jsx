import { useEffect } from "react";
import { useState } from "react";

const useWhyshould = () => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://summer-camp-school-server-rahatul99.vercel.app/whyShould')
        .then(res => res.json())
        .then(data => {
            setCardData(data)
            setLoading(false)
        })
    }, [])
    return [cardData, loading];
};

export default useWhyshould;