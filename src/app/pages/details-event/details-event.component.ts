import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyEvent } from 'src/app/core/models/myevent';
import { EventService } from 'src/app/core/services/event.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {


  eventlist:MyEvent[] = [];
  eventbyid: MyEvent=new MyEvent();
  id: any;
  frequence

   
  constructor(private myeventService: EventService,
        @Inject(MAT_DIALOG_DATA) data,
  public dialogRef: MatDialogRef<DetailsEventComponent>,
   config: NgbModalConfig,
     private modalService: NgbModal  ) 
   {
     this.id=data.id;
  }

  ngOnInit(): void {
    this.geteventbyid();
  }
 
  closeModal() {
    this.dialogRef.close();
  }

 open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  geteventbyid(){
    this.myeventService.getEventById(this.id).subscribe(res=>{
      this.eventbyid=res; 
    console.log("this event by id::: ", this.eventbyid)  
    if(this.eventbyid.type=="Static"){
      
      console.log("event static");
       ( document.querySelector<HTMLElement>(".event-static")).style.display= "block";
       (document.querySelector<HTMLElement>(".event-reccursive")).style.display= "none";}
       else if (this.eventbyid.type == "Recursive"){

        console.log("event Recursive");
         ( document.querySelector<HTMLElement>(".event-reccursive")).style.display= "block";
          (document.querySelector<HTMLElement>(".event-static")).style.display= "none";}
          
          if (this.eventbyid.frequency=="WEEKLY"){
            this.frequence="Semaine";
           
          } else if (this.eventbyid.frequency == "MONTHLY"){
            this.frequence="Mois";
          }
})

    }

   
    
}
