import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { CountByLocation } from '../interfaces/count-by-location'
import { Museum } from '../interfaces/museum'
const apiPath = 'https://data.culture.gouv.fr/api/v2/catalog/datasets'
interface GeographicRepartitionRaw {
    aggregations: {
        departement?: string,
        ville?: string,
        region?: string,
        count: string
    }[]
}
export class MuseumAPI {
    public static getMuseums(limit = 20, offset = 0): Observable<Museum[]> {
        return ajax.getJSON<Museum[]>(`${apiPath}/liste-et-localisation-des-musees-de-france/exports/json?select=ville,nom_du_musee,ref_musee&rows=${limit}&start=${offset}`)
    }

    public static getMuseum(ref: string): Observable<Museum> {
        return ajax.getJSON<Museum[]>(`${apiPath}/liste-et-localisation-des-musees-de-france/exports/json?where=ref_musee%3D${ref}`).pipe(
            map(museums => museums[0])
        )
    }

    public static museumCount(): Observable<number> {
        type ServerResult = {
            aggregations: {
                count: number
            }[]
        }
        return ajax.getJSON<ServerResult>(`${apiPath}/liste-et-localisation-des-musees-de-france/aggregates?select=count(*) as count`).pipe(
            map(res => res.aggregations[0].count)
        )


    }

    public static getNightEventCountByCity(): Observable<CountByLocation[]> {
        return ajax.getJSON<GeographicRepartitionRaw>(
            `${apiPath}/nuit-des-musees-2018/aggregates?select=count(*) as count&group_by=ville&order_by=count(ville) desc`
        ).pipe(
            map(result => result.aggregations.map(row =>
                ({ location: row.ville, count: +row.count })
            ))
        )
    }
    public static getNightEventCountByRegion(): Observable<CountByLocation[]> {
        return ajax.getJSON<GeographicRepartitionRaw>(
            `${apiPath}/nuit-des-musees-2018/aggregates?select=count(*) as count&group_by=region&order_by=count(region) desc`
        ).pipe(
            map(result => result.aggregations.map(row =>
                ({ location: row.region, count: +row.count })
            ))
        )
    }
    public static getNightEventCountByDepartment(): Observable<CountByLocation[]> {
        return ajax.getJSON<GeographicRepartitionRaw>(
            `${apiPath}/nuit-des-musees-2018/aggregates?select=count(*) as count&group_by=departement&order_by=count(departement) desc`
        ).pipe(
            map(result => result.aggregations.map(row =>
                ({ location: row.departement, count: +row.count })
            ))
        )
    }
}