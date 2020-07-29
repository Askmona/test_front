export const fetchMuseumsList = async (
  query: string,
  page: number,
  rows = 10
) => {
  const start = (page - 1) * rows;
  try {
    const result: Response = await fetch(
      `https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france/records?search=${query}&rows=${rows}&start=${start}`
    );
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};

export const fetchMuseum = async (id: string) => {
  try {
    const result: Response = await fetch(
      `https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france/records/${id}`
    );
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};
