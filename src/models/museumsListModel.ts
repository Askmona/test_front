interface Parameters {
  dataset: string;
  timezone: string;
  rows: number;
  format: string;
}

interface Fields {
  departement: string;
  ville: string;
  nom_du_musee: string;
  adr: string;
  region: string;
  fax: string;
  coordonnees_finales: number[];
  ref_musee: string;
  telephone1: string;
  sitweb: string;
  cp: string;
  date_appellation: string;
  periode_ouverture: string;
  fermeture_annuelle: string;
  jours_nocturnes: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Record {
  datasetid: string;
  recordid: string;
  fields: Fields;
  geometry: Geometry;
  record_timestamp: Date;
}

export default interface IMuseumsList {
  nhits: number;
  parameters: Parameters;
  records: Record[];
}
