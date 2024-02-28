import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/app/models/link.model';
import { Photo } from 'src/app/models/photo.mode';
import { AlbumService } from 'src/app/services/album.service';
import { PhotoModalComponent } from 'src/app/shared/photo-modal/photo-modal.component';
import { ImageCaptureComponent } from '../image-capture/image-capture.component';
import { Album } from 'src/app/models/album.modell';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  link?: Link;

  album?: Album;

  query?: {
    code: string
  };

  loading = false;

  invalidAlbum = false;

  photos: Photo[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.loading = true
    this.route.queryParams.subscribe(query => {
      this.query = query as {
        code: string
      };
      if (!query['code']) {
        this.invalidAlbum = true;
        return
      }
      this.albumService.getByCode(this.query.code)
        .subscribe((response) => {
          if (!response.status) {
            this.invalidAlbum = true;
            return;
          }

          this.invalidAlbum = false;

          this.link = response.payload;

          this.loading = false;
          if (response.payload.access_type === 0) {
            this.dialog.open(ImageCaptureComponent, {
              data: {
                code: query['code'],
                album: response.payload
              }
            });
          } else {

            this.albumService.getByPeople([], response.payload.album_id).subscribe((response) => {
              if (response.status) {
                this.album = response.payload as Album
                this.albumService.singleContent.next(this.album);
              }
            })
          }

        },
          err => {
            this.invalidAlbum = true;
          });
    });
  }

  open(photo: Photo) {
    const dialogRef = this.dialog.open(PhotoModalComponent, {
      data: {
        photo: photo,
        album: this.album
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  handleError({ id }: Photo) {
    if (this.album && this.album.photos) {
      this.album.photos = this.album?.photos.filter(photo => photo.id !== id);
    }
  }
}
