import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<Curso[]>;

  constructor(
    private service: CursosService
  ) { }

  ngOnInit(): void {
    // this.service.list().subscribe(res => this.cursos = res);
    this.cursos$ = this.service.list();
  }

}