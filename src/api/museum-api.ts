import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { Museum } from '../interfaces/museum'
const apiPath = 'https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france'
export class MuseumAPI {
    public static getMuseums(): Observable<Museum[]> {
        return ajax.getJSON<Museum[]>(`${apiPath}/exports/json?select=ville,nom_du_musee,ref_musee`)
    }

    public static getMuseum(ref: string): Observable<Museum> {
        return ajax.getJSON<Museum[]>(`${apiPath}/exports/json?where=ref_musee%3D${ref}`).pipe(
            map(museums => museums[0])
        )
    }
}