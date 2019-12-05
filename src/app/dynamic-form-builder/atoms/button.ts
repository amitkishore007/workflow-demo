import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'Button',
    template: `
      <div [formGroup]="form">
        <input *ngIf="field.type === 'button'" [attr.type]="'submit'" class="form-control"  [id]="field.name" [name]="field.name" [formControlName]="field.name">
      </div> 
    `
})
export class ButtonComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
  
    constructor() {

    }
}