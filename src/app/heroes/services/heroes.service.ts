import { environments } from './../../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl = environments.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  private getHeroesRequest(url: string): Observable<Hero[]>  {
    return this.http.get<Hero[]>( url ).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error)),
    )
  }

  getHeroes(): Observable<Hero[]> {
    return this.getHeroesRequest(`${ this.baseUrl }/heroes`)
  }

  getHeroById( id: string ): Observable<Hero> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error)),
      )
  }

  gerSuggestions( query: string ): Observable<Hero[]> {
    return this.getHeroesRequest(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`)
  }


  addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error)),
      )
  }

  updateHero( hero: Hero ): Observable<Hero> {
    if(!hero.id) throw new Error("Hero id is required");
    
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error)),
      )
  }

  deleteHero( id: string ): Observable<boolean> {

    
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map( resp => true ),
        catchError((error: HttpErrorResponse) => throwError(() => error)),
      )
  }
}
