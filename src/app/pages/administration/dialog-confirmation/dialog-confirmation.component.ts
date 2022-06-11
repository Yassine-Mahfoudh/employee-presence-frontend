import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent implements OnInit {
  title = 'confirm_dialog.title';
  description = 'confirm_dialog.description';
  descriptionObjection = '';
  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent, boolean>,@Inject(MAT_DIALOG_DATA)
  data: {
title?: string;
description?: string;
count?: number;
withcheckbox?: boolean;
labelcheckBox?: string;
}) { const { title, description, count, withcheckbox, labelcheckBox } = data;
this.setTitle(title);
this.setDescription(description);
 }

  ngOnInit(): void {
  }
  setTitle(title?: string) {
    if (Boolean(title)) {
      this.title = title;
    }
  }

 
  setDescription(description?: string) {
    if (Boolean(description)) {
      this.description = description;
    }
  }
  respond(confirm: boolean) {
    this.dialogRef.close(confirm);
  }
}
