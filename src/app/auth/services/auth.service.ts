import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interfaces';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User
  constructor(
    private http: HttpClient
  ) { }


  get currentUser(): User | undefined{
    if (!this.user) return;
    return structuredClone( this.user );
  }

  login(email: string, password: string): Observable<User>{
    return this.http.get<User>(`${ this.baseUrl }/Users/1 `).pipe(
      tap( user => this.user = user ),
      tap( user => sessionStorage.setItem( 'token', user.id.toString())),
      catchError((error: HttpErrorResponse) => throwError(() => error)),
    )
  }

  checkoutAuthentication(): Observable<boolean>{

    const token = sessionStorage.getItem( 'token' );
    if( !token ) return of( false );

    return this.http.get<User>(`${ this.baseUrl }/Users/1`).pipe(
      tap( user => this.user = user ),
      map( user => !!user ),
      catchError(() => of( false )),
    )
  }

  logout(): void{
    this.user = undefined;
    sessionStorage.clear();
  }
}
