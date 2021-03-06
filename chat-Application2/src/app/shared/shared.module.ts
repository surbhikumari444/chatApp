import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FirstCharComponent } from './first-char/first-char.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserDetailsComponent, FirstCharComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    UserDetailsComponent,
    FirstCharComponent,
    CommonModule,
    FormsModule

  ]
})
export class SharedModule { }
