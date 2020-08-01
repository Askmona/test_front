import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { CountByLocation } from '../interfaces/count-by-location'
import { MuseumAttendanceRecord } from '../interfaces/museum-attendance-record'
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
    public static getMuseums(limit: number, offset: number, searchPattern = ''): Observable<Museum[]> {
        return ajax.getJSON<Museum[]>(
            `${apiPath}/liste-et-localisation-des-musees-de-france/exports/json?select=ville,nom_du_musee,ref_musee&rows=${limit}&start=${offset}&search=${searchPattern}`)
    }

    public static getMuseum(ref: string): Observable<Museum> {
        return ajax.getJSON<Museum[]>(`${apiPath}/liste-et-localisation-des-musees-de-france/exports/json?where=ref_musee%3D${ref}`).pipe(
            map(museums => museums[0])
        )
    }

    public static museumCount(searchPattern = ''): Observable<number> {
        // Aggregate function of API was used initially, but it could not provide a search/filter function
        return ajax.getJSON<{ count: number }[]>(`${apiPath}/liste-et-localisation-des-musees-de-france/exports/json?select=count(*) as count&search=${searchPattern}`).pipe(
            map(res => res.length ? res[0].count : 0),
            catchError(error => {
                console.error(error);
                return of(0)
            })
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

    public static getMuseumAttendance(ref: string): Observable<MuseumAttendanceRecord[]> {
        return ajax.getJSON<MuseumAttendanceRecord[]>(
            `${apiPath}/frequentation-des-musees-de-france/exports/json?select=annee,payant,gratuit,total&where=ref_musee%3D${ref}&sort=annee`
        )
    }
}