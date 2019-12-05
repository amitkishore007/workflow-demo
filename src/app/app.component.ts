import { Component, ViewChild, ViewContainerRef, ViewRef, TemplateRef, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from './form-service';
import { DynamicFormService } from './dynamic-form-builder/dynamic-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  unsubcribe: any

  public fields: any[] = [];
  currentStep:any;

  finalProcess:boolean = false;

  steps:any[] = [];

  constructor(private formService: FormService, private dynamicFormService: DynamicFormService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.formService.JsonFieldsListener().subscribe((fields) => {
      fields.map((field, index) => {
        let step = {slug: field.slug,title: field.title ,completed: false};
        step.completed = index == 0 ? true: false;
        this.steps.push({...step});
      });
    });
    
    this.formService.getJsonFields().subscribe((currentStep) => {
      if(currentStep){
        this.currentStep = currentStep;
        let fields = this.formService.sortJson([...currentStep.form_fields]);
        this.fields = [...fields];
        let control = this.formService.getFormoControls(this.fields);
        this.form.addControl('fields', control);
     }
    });


    this.formService.currentFlowListener().subscribe((currentStep) => {
      if(currentStep){

        this.currentStep = currentStep;
        let fields = this.formService.sortJson([...currentStep.form_fields]);
        this.fields = [...fields];
        
        let stepIndex = this.steps.findIndex((step) => step.slug === this.currentStep.slug);

        if(stepIndex != -1) {
          this.steps[stepIndex].completed = true;
        }

        if(this.currentStep.slug == 'offer-details') {
          this.finalProcess = true;
          return;
        }

      }
    });
  }


  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }

  submitForm(event) {
    this.form.removeControl('fields');
    this.formService.getNextFields(this.currentStep.on_submit[0].next_step);
  }
  
}
