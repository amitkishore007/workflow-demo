import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicFormBuilderModule } from './dynamic-form-builder/dynamic-form-builder.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormService } from './form-service';
import { DynamicFormService } from './dynamic-form-builder/dynamic-form.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule,
    HttpClientModule
  ],
  providers: [FormService, DynamicFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
