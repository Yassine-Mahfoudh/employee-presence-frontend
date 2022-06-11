import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { hasrequiredField } from './Hasrequired';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}
@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {
  @ViewChild("select") select: any;
  @Input() appearance: MatFormFieldAppearance = "outline";
  @Input() type = "text";
  @Input() control: FormControl;
  @Input() label = "";
  @Input() value = "";
  @Input() min?: any;
  @Input() max?: any;
  @Input() discond = true;

  required = hasrequiredField;
  @Input() number = false;
  @Input() enableOnlyArabic = false;
  @Input() d = false;
  @Input() withtprefiix = false;
  @Input() prefix = "TND";
  @Input() lettre = false;
  @Input() isMontant = false;
  @Input() numberphone = false;
  @Input() insideEditableTable = false;
  @Input() isWithAutocomplete = false;
  @Input() listData = [];
  @Input() isDisabled = false;
  @Input() itemToFilterWith: string = "";
  @Input() hasTooltip: boolean = false;

  @Output() keyUpEvent = new EventEmitter<any>();
  @Input() typedValue: string = "";
  listFilteredOptions = [];
  @Input() read = false;
  @Input() formated = false;

  constructor(
    
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { listData } = changes;
    if (listData) {
      if (listData.currentValue !== listData.previousValue) {
        this.loadDataSource(listData.currentValue);
      }
    }
  }

  loadDataSource(listData) {
    this.listData = listData;
    this.filterListData();
  }

  emitTypedValue(event: any) {
    this.keyUpEvent.emit(event.target.value.toLowerCase());
  }

  filterListData() {
    if (!this.typedValue) {
      this.listFilteredOptions = [...this.listData];
    } else {
      this.listFilteredOptions = this.listData.filter((option) => {
        if (
          option[this.itemToFilterWith]
            .toLowerCase()
            .includes(this.typedValue.toLowerCase())
        ) {
          return option;
        }
      });
    }
  }
  format(data) {
   
  }

  /*  clear($event: any) {
    $event.stopPropagation();
    this.control.setValue(undefined);
  }*/
}

