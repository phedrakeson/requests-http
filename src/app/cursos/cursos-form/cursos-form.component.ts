import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      map(params => params.id),
      switchMap(id => this.service.loadByID(id))
    )
    .subscribe(curso => this.updateForm(curso) );

    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  updateForm(curso) {
    this.form.patchValue({
      nome: curso.nome,
      id: curso.id
    })
  }
  
  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value)
    if(this.form.valid) this.service.create(this.form.value).subscribe(
      sucesso => { this.modal.showAlertSuccess('Curso criado com sucesso!'); this.location.back(); },
      erro => this.modal.showAlertDanger(erro),
      () => console.log('request completo')
    )
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('cancel')
  }

}
