import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { LinksRoutingModule } from './links-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { WebcamModule } from 'ngx-webcam';
import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    GalleryComponent,
    ImageCaptureComponent
  ],
  imports: [
    CommonModule,
    LinksRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    NgOptimizedImage,
    WebcamModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class LinksModule { }
