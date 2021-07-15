import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt: string = 'Cancelar';
  @Input() confirmTxt: string = 'Confirmar';

  confirmResult: Subject<boolean>;

  constructor(
    private bsModalRef: BsModalRef
  ) { 
    this.confirmResult = new Subject()
   }

  ngOnInit(): void {
  }

  onClose() {
    this.confirmResult.next(false);
    this.bsModalRef.hide();
  }

  onConfirm() {
    this.confirmResult.next(true);
    this.bsModalRef.hide();
  }

}
