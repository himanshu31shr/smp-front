import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Album } from 'src/app/models/album.modell';
import { People } from 'src/app/models/people.model';
import { Photo } from 'src/app/models/photo.mode';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.scss']
})
export class ImageCaptureComponent {

  private trigger: Subject<void> = new Subject<void>();

  image?: WebcamImage;

  people?: People[];

  constructor(
    private albumService: AlbumService,
    @Inject(MAT_DIALOG_DATA) public data: {
      code: string,
      album: Album
    }
  ) {}

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  handleCapture(image: WebcamImage) {
    this.image = image
  }

  match() {
    this.data.album.photos = [];
    const form = new FormData();
    form.append('image', this.base64toBlob(this.image?.imageAsBase64 || '', 'image/jpeg'));
    form.append('code', this.data.code);

    this.albumService.getMatch(form).subscribe((response) => {
      if(response.status) {
        this.people = response.payload;
        const peps: string[] = this.people.map(pe => pe.id.toString())
        const speps = new Set(peps);

        this.albumService.getByPeople(Array.from(speps)).subscribe((response) => {
          if(response.status) {
            this.data.album.photos = response.payload as Photo[];
            this.albumService.singleContent.next(this.data.album);
          }
        })
      }
    });
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }

  private base64toBlob(base64: string, contentType: string): Blob {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: contentType });
  }
}
