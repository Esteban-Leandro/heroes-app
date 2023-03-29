import { environments } from './../../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
}
