import { Photo } from './../../models/photo.mode';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { MatCardModule } from '@angular/material/card';
import { PhotoService } from 'src/app/services/photo.service';
import { MatListModule } from '@angular/material/list';
import { Album } from 'src/app/models/album.modell';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage, MatCardModule, MatListModule, CommonModule, MatIconModule, MatGridListModule]
})
export class PhotoModalComponent implements OnInit {

  index: number = 0;
  
  isElementVisible = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { photo: Photo, album: Album },
    private service: PhotoService,
    private _dialog: MatDialog,
    private auth: AuthService
  ) { }

  close() {
      this._dialog.closeAll();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (event.code === 'ArrowRight') {
      this.next();
    }

    if (event.code === 'ArrowLeft') {
      this.prev();
    }
  }

  ngOnInit(): void {

    this.data.album.photos.forEach((photo: Photo, idx: number) => {
      if (photo.id === this.data.photo.id) {
        this.index = idx;
      }
    });

    this.getDetails();

  }

  getDetails() {
    if(this.auth.isAuth()) {
      this.service.getDetails(this.data.photo.id).subscribe(response => {
        if (response.payload) {
          this.data.photo = {
            ...response.payload,
            ...this.data.photo,
          }
        }
      });
    }
  }

  next() {
    if (this.data.album.photos[this.index + 1]) {
      this.data.photo = this.data.album.photos.at(this.index + 1)!;
      this.getDetails();
      this.index++;
    }
  }

  prev() {
    if (this.data.album.photos[this.index - 1]) {
      this.data.photo = this.data.album.photos.at(this.index - 1)!;
      this.getDetails();
      this.index--;
    }
  }


  showElement(): void {
    this.isElementVisible = true;
  }

  hideElement(): void {
    this.isElementVisible = false;
  }

}
