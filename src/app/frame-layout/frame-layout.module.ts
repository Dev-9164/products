import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameLayoutComponent } from './frame-layout.component';
import { FrameLayoutRoutingModule } from './frame-layout-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [FrameLayoutComponent],
  imports: [
    CommonModule,
    FrameLayoutRoutingModule,
  ],
})
export class FrameLayoutModule { }
