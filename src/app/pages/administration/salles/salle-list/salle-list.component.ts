import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Salle } from 'src/app/core/models/salle';
import { SalleService } from 'src/app/core/services/salle.service';
import { SalleComponent } from '../salle/salle.component';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.css']
})
export class SalleListComponent implements OnInit {

  isPopupOpened = true;
  salleList:Salle[] = [];

  salleobj: Salle = new Salle();

  constructor(protected dialog?:MatDialog,
    private salleService?:SalleService) { }

    getSalles(){
      this.salleService.getSalles().subscribe(res=>{
        this.salleList=res;
      })
    }

    addSalle() {
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(SalleComponent, {
        data: {}
      });
  
  
      dialogRef.afterClosed().subscribe(result => {
        this.isPopupOpened = false;
      });
    }

    editSalle(salle: Salle) {
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(SalleComponent, {
        data: salle
      });
  
  
      dialogRef.afterClosed().subscribe(result => {
        this.isPopupOpened = false;
      });
      this.getSalles();
    }

    deleteSalle(salle : Salle){

      this.salleService.deleteSalle(salle).subscribe(res=>{
        console.log(res);
        alert("salle deleted successfully");
        this.getSalles();
      }
      );
    
    }



  ngOnInit(): void {
  }

}
