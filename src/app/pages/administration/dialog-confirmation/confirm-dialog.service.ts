import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogConfirmationComponent } from './dialog-confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog,) { }

  confirm(
    title?: string,
    description?: string,
 
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title, description},
      panelClass: "custom-dialog-container",
    });
    return dialogRef.afterClosed();
  }

  close() {
    this.dialog.closeAll();
  }
}
