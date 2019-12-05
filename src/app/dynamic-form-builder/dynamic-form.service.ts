import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable()
export class DynamicFormService {

    formEvent: Subject<FormGroup> = new Subject<FormGroup>();


    formListener() {
        return this.formEvent.asObservable();
    }

    emit(form:FormGroup) {
        this.formEvent.next(form);
    }
    
}