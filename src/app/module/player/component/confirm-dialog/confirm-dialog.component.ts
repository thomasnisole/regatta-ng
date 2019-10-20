import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

  public title: string;

  public message: string;

  public constructor(private activeModal: NgbActiveModal) { }

  public onCancel(): void {
    this.activeModal.dismiss();
  }

  public onConfirm(): void {
    this.activeModal.close();
  }
}
