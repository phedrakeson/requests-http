import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs/operators'
import { Curso } from './curso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}/cursos`;

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Curso[]>(this.API).pipe(
      delay(2000),
    );
  }

  loadByID(id) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

  create(curso) {
    return this.http.post(this.API, curso).pipe(
      take(1)
    )
  }

  update(curso) {
    return this.http.put(`${this.API}/${curso.id}`, curso ).pipe(
      take(1)
    );
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
