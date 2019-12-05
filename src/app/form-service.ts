import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable()
export class FormService {

    JsonFields:any[] = [];
    currentStep:any;

    currentFlowEvent:Subject<any> = new Subject<any>();

    JsonFieldsEvent: Subject<any> = new Subject<any>();

    constructor(private http: HttpClient) {}

    getJsonFields() {
        return this.http.get('./assets/workflow.json').pipe(
            map((result:any) => {
                this.JsonFields = [...this.sortJson(result)];
                this.currentStep = this.JsonFields[0];
                this.JsonFieldsEvent.next([...this.JsonFields]);
                // this.currentFlowEvent.next({...this.currentStep});
                return this.currentStep;
            })
        )
    }

    JsonFieldsListener() {
        return this.JsonFieldsEvent.asObservable();
    }

    sortJson(jsonFields: any[]) {
        return jsonFields.sort((a, b) => a.order - b.order);
    }

    getNextFields(slug:any) {
        let step = this.JsonFields.find((field) => field.slug === slug);
        this.currentFlowEvent.next({...step});
        return step;
    }

    currentFlowListener() {
        return this.currentFlowEvent.asObservable();
    }


    getFormoControls(formFields:any) {
        return new FormControl(JSON.stringify(formFields))
    }
}