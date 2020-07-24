import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = url => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        axios.get(url)
            .then(({ data }) => {
                setError(null);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setData(null);
                setLoading(false);
            })
    }, [url]);
    
    return {
        data,
        error,
        loading,
    };
};

export default useAxios;