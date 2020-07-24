import * as APIUrls from "./_APIUrls.js";
import queryString from "query-string"

const API_ROOT = "https://data.culture.gouv.fr/api/v2/catalog/datasets";

export const API_MUSEUMS = `${API_ROOT}/liste-et-localisation-des-musees-de-france/records`;
export const getMuseumById = museumID => `${API_MUSEUMS}/${museumID}`;
export const getMuseumsWithQuery = queryObj => (
    API_MUSEUMS + "?" + queryString.stringify(queryObj)
);

export default APIUrls;