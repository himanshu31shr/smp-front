import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Album } from 'src/app/models/album.modell';
import { PhotoService } from 'src/app/services/photo.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dropzone',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    NgxDropzoneModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {

  files: File[] = [];

  spin = false;

  constructor(
    private service: PhotoService,
    @Inject(MAT_DIALOG_DATA) public album: Album,
    public dialog: MatDialog,
  ){}

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload() {
    this.spin = true;
    const formData = new FormData();
    formData.append('album_id', this.album.id.toString());
    this.files.map(file => {
      formData.append('image', file);
    });

    this.service.create(formData).subscribe((response) => {
      setTimeout(() => {
        this.spin = false;
        this.dialog.closeAll();
      }, 1000);
    });
  }

}
