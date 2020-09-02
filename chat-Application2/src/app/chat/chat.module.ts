import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RemoveSpecialCharPipe } from './../shared/pipe/remove-special-char.pipe'





@NgModule({
  declarations: [ChatBoxComponent ,RemoveSpecialCharPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'chat', component: ChatBoxComponent }
    ]),
    SharedModule
  ]
})
export class ChatModule { }
