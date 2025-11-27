import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  readonly API = 'http://localhost:3000/api/users'

  constructor(private readonly httpClient: HttpClient){}

  postUser(user: Iuser): Observable<Iuser>{
    return this.httpClient.post<Iuser>(this.API, user, this.httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  getUser() {
  return this.httpClient.get('http://localhost:3000/api/users', {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
}


  private handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error('Erro na comunicação com o servidor'));
  }
}
