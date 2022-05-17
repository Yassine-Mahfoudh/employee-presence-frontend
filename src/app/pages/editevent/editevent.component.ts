import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyEvent } from 'src/app/core/models/myevent';
import { EventService } from 'src/app/core/services/event.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.scss']
})
export class EditeventComponent implements OnInit {

  eventDetail!: FormGroup;
  eventobj: MyEvent = new MyEvent();
  eventlist:MyEvent[] = [];
id;
title
  constructor(private formBuilder : FormBuilder,
     private myeventService: EventService,
  config: NgbModalConfig,@Inject(MAT_DIALOG_DATA) data,
      private modalService: NgbModal  ) 
    {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
 this.title=data.title
 this.id=data.id

      }

  ngOnInit(): void {
    this.getevents();
    this.eventDetail = this.formBuilder.group({
      id: [''],
     /* title:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(4)]],
      datedebut:[null,[Validators.required, Validators.pattern(GlobalConstants.dateRegex)]],
      datefin:[null,[Validators.required, Validators.pattern(GlobalConstants.dateRegex)]]*/
      title:[this.title,[Validators.required, Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(4)]],
      datedebut: [''],
      datefin: [''],
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 


getevents(){
  this.myeventService.getEvents().subscribe(res=>{
    this.eventlist=res;
  })
}

editEvent(event : MyEvent){
  this.eventDetail.controls['id'].setValue(event.id);
  this.eventDetail.controls['title'].setValue(event.title);
  this.eventDetail.controls['datedebut'].setValue(event.start);
  this.eventDetail.controls['datefin'].setValue(event.end);

}

deleteEvent(){

    this.myeventService.deleteEvent(this.eventobj).subscribe(res=>{
      console.log(res);
      alert("event deleted successfully");
      this.getevents();
    }
    );
  
  }

updateEvent(){
  this.eventobj.id=this.eventDetail.value.id;
  this.eventobj.title=this.eventDetail.value.title;
  this.eventobj.start=this.eventDetail.value.datedebut;
  this.eventobj.end=this.eventDetail.value.datefin;
  this.myeventService.updateEvent(this.eventobj).subscribe(res=>{
    console.log(res);
    this.getevents();
  }
  );

}

confirmDelete() {
  if(confirm("Are you sure you want to delete event "+this.eventobj.title)) {
     this.deleteEvent();
  }
}

handleClear(){
  this.eventDetail.reset();
}

}