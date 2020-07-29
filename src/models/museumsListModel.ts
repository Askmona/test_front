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
  id: string;
  fields: Fields;
  timestamp: Date;
  size: number;
}

export interface IMuseum {
  links: {}[];
  record: Record;
}

export interface IMuseumsList {
  total_count: number;
  links: {}[];
  records: IMuseum[];
}
