export const fetchMuseumList = async (query: string, page: number) => {
  const start = (page - 1) * 10;
  let result: Response;
  try {
    result = await fetch(
      `https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-et-localisation-des-musees-de-france&q=${query}&start=${start}`
    );
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};
