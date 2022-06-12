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

  

   
    
}
