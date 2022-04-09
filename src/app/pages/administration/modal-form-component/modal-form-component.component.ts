import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-form-component',
  templateUrl: './modal-form-component.component.html',
  styleUrls: ['./modal-form-component.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ModalFormComponentComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
 // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
}

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content);
  }
  
}
