import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DropzoneComponent } from 'src/app/shared/dropzone/dropzone.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumsRoutingModule } from './albums-routing.module';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ListAlbumComponent } from './list-album/list-album.component';
import { CreateShareLinkComponent } from './create-share-link/create-share-link.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    ListAlbumComponent,
    CreateAlbumComponent,
    AlbumDetailsComponent,
    CreateShareLinkComponent,
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    DropzoneComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NgOptimizedImage,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule


  ]
})
export class AlbumsModule { }
