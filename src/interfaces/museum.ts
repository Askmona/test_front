export interface Museum {
    nom_du_musee: string;
    ref_musee: string;

    adr?: string;
    cp?: string;
    ville: string;
    departement?: string;
    region?: string;
    coordonnees_finales?: { lat: number, lon: number }

    sitweb?: string;
    telephone1?: string;
    fax?: string;

    fermeture_annuelle?: string;
    jours_nocturnes?: string
    periode_ouverture?: string;

    date_appellation?: string;
    date_retrait_appellation_par_haut_conseil?: string
}