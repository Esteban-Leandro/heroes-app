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


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`)
  }

  getHeroById( id: string ): Observable<Hero> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error)),
      )
  }
}
