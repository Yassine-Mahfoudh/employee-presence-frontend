import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { SalleComponent } from './salle/salle.component';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {

  constructor(private dialogRef:MatDialog) { }

  openDialog(){
    this.dialogRef.open(SalleComponent);
  }

  ngOnInit(): void {
  }

}
