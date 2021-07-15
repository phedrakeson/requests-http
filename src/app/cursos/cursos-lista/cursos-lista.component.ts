import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
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

  @ViewChild('deleteModal') deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef: BsModalRef
  deleteModalRef: BsModalRef
  selectedCourse: Curso;

  constructor(
    private service: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
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

  onDelete(curso) {
    this.selectedCourse = curso;
    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY )
    ).subscribe(
      success => window.location.reload(),
      error => this.alertModalService.showAlertDanger(error)
    )
  }

  onConfirmDelete() {
    this.service.remove(this.selectedCourse.id).subscribe(
      success => window.location.reload(),
      error => this.alertModalService.showAlertDanger(error)
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
