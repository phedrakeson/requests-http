import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
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
  bsModalRef: BsModalRef

  constructor(
    private service: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.service.list().subscribe(res => this.cursos = res);
    this.cursos$ = this.service.list()
    .pipe(
      take(1),
      catchError(err => {
        console.error(err);
        // this.error$.next(true);
        this.handleError()
        return empty();
      })
    );
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar os cursos. Tente novamente mais tarde.') 
  }

  onEdit(id) {
    this.router.navigate([`editar/${id}`], { relativeTo: this.route });
  }

}
