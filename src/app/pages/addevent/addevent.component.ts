import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyEvent } from 'src/app/core/models/myevent';
import { EventService } from 'src/app/core/services/event.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  eventDetail!: FormGroup;
  eventobj: MyEvent = new MyEvent();
  eventlist:MyEvent[] = [];

  constructor(private formBuilder : FormBuilder,
     private myeventService: EventService,
  config: NgbModalConfig,
      private modalService: NgbModal  ) 
    {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getevents();
    this.eventDetail = this.formBuilder.group({
      id: [''],
      /*title:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(4)]],
      datedebut:[null,[Validators.required, Validators.pattern(GlobalConstants.dateRegex)]],
      datefin:[null,[Validators.required, Validators.pattern(GlobalConstants.dateRegex)]]
      */
      title:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(4)]],
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

 

  addEvent(){

    console.log(this.eventDetail);
    this.eventobj.id=this.eventDetail.value.id;
    this.eventobj.title=this.eventDetail.value.title;
    this.eventobj.start=this.eventDetail.value.datedebut;
    this.eventobj.end=this.eventDetail.value.datefin;
    this.myeventService.addEvent(this.eventobj).subscribe(res=>{
      console.log(res);
      this.getevents();
      //setTimeout("location.reload(true);",500);

    }
    );


}

getevents(){
  this.myeventService.getEvents().subscribe(res=>{
    this.eventlist=res;
  })
}

editEvent(demande : MyEvent){
  this.eventDetail.controls['id'].setValue(demande.id);
  this.eventDetail.controls['title'].setValue(demande.title);
  this.eventDetail.controls['datedebut'].setValue(demande.start);
  this.eventDetail.controls['datefin'].setValue(demande.end);

}

deleteEvent(event : MyEvent){

    this.myeventService.deleteEvent(event).subscribe(res=>{
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

confirmDelete(event: MyEvent) {
  if(confirm("Are you sure you want to delete event "+event.title)) {
     this.deleteEvent(event);
  }
}

handleClear(){
  this.eventDetail.reset();
}

}
