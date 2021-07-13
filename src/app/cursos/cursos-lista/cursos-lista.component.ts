import { Component, OnInit } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService
  ) { }

  ngOnInit(): void {
    // this.service.list().subscribe(res => this.cursos = res);
    this.cursos$ = this.service.list()
    .pipe(
      catchError(err => {
        console.error(err);
        this.error$.next(true);
        return empty();
      })
    );
  }

}
