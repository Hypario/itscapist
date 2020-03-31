import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Player} from './app/game/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  readonly apiUrl: string = 'api/players';

  constructor( private http: HttpClient) {
  }

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers,
  };


  // Retourne toutes les personnes
  getPlayers(): Observable<Player[]> {
    return this.http.get<Observable<Player[]>>(this.apiUrl).pipe(
      tap((rep: any) => console.log(rep)),
      map(rep => rep.map(p => new Player()),
      catchError(this.handleError<Player[]>(`getPlayers`, []))
    ));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed : ${error.message}`);
      return of(result as T);
    };
  }

}
