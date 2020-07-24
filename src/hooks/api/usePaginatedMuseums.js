import * as R from "ramda";

import useAxios from "hooks/useAxios.js"
import {
    getMuseumsWithQuery,
} from "./_APIUrls.js";

const usePaginatedMuseums = ({ page = 1, rows = 50, where } = {}) => {
    const start = (page - 1) * rows;
    const url = getMuseumsWithQuery({ start, rows, where });
    const res = useAxios(url);
    const { data, loading, error } = res;

    let pages = 0;
    let museums = null;
    let count = 0;
    if (!loading && !error) {
        museums = R.map(
            ({ record }) => ({
                ...record?.fields,
                ...record,
            }),
            data?.records
        );
        count = data?.total_count;
        pages = Math.ceil(count / rows);
    }

    return {
        count,
        pages,
        page,
        start,
        rows,
        museums,
        ...R.omit(["data"], res),
    };
};

export default usePaginatedMuseums;