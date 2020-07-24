import useAxios from "hooks/useAxios.js"
import {
    getMuseumById,
} from "./_APIUrls.js";

const useMuseum = museumID => {
    const res = useAxios(getMuseumById(museumID));

    return {
        ...res,
        museum: res?.data?.record?.fields,
    };
};

export default useMuseum;