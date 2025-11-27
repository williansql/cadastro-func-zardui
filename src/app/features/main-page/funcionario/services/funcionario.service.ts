import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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

  funcionarioEvent: EventEmitter<boolean> = new EventEmitter<boolean>();


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

  putUser(user: Iuser): Observable<Iuser> {
    if (!user.id) {
      return throwError(() => new Error('ID do usuário é obrigatório para atualização'));
    }
    return this.httpClient.put<Iuser>(`${this.API}/${user.id}`, user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string | number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error('Erro na comunicação com o servidor'));
  }
}
