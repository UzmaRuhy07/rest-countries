import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombineTextsPipe } from './combine-texts.pipe';
import { TextByIdPipe } from './text-by-id.pipe';



@NgModule({
  declarations: [CombineTextsPipe, TextByIdPipe],
  imports: [
    CommonModule
  ],
  exports:[CombineTextsPipe, TextByIdPipe]
})
export class SharedModule { }
