import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'dynamic-form-builder',
  template:`
    <form (ngSubmit)="onSubmit.emit(this.form.value)" [formGroup]="form" class="form-horizontal">
      <div *ngFor="let field of fields">
          <field-builder [field]="field" [form]="form"></field-builder>
      </div>
      <div class="form-row"></div>
      <div class="form-group row">
        <div class="col-md-3"></div>
        <div class="col-md-9">
          <button type="submit" [disabled]="!form.valid" class="btn btn-primary">Save</button>
        </div>
      </div>
    </form>
  `,
})


export class DynamicFormBuilderComponent implements OnInit, OnChanges {
  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input() form: FormGroup;
  constructor(private DynamicFormService: DynamicFormService) { }

  ngOnInit() {


    // let fieldsCtrls = {};
    // for (let f of this.fields) {
    //   if (f.type != 'checkbox') {
    //     fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
    //   } else {
    //     let opts = {};
    //     for (let opt of f.options) {
    //       opts[opt.key] = new FormControl(opt.value);
    //     }
        
    //     this.form.addControl(f.name, new FormGroup(opts));
    //     // fieldsCtrls[f.name] = new FormGroup(opts)
    //   }
    // }
    // this.form = new FormGroup(fieldsCtrls);
    // this.DynamicFormService.emit(this.form);

  }

  ngOnChanges() {
    let fieldsCtrls = {};

    if(this.fields && this.fields.length && this.form) {
      for (let f of this.fields) {
        if (f.type != 'checkbox') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
        } else {
          let opts = {};
          for (let opt of f.options) {
            opts[opt.key] = new FormControl(opt.value);
          }
          
          this.form.addControl(f.name, new FormGroup(opts));
          // fieldsCtrls[f.name] = new FormGroup(opts)
        }
      }
      this.form = new FormGroup(fieldsCtrls);
      this.DynamicFormService.emit(this.form);
    }
  }
}
