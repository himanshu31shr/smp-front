import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Album } from 'src/app/models/album.modell';
import { Photo } from 'src/app/models/photo.mode';
import { AlbumService } from 'src/app/services/album.service';
import { CreateAlbumComponent } from '../create-album/create-album.component';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.scss']
})
export class ListAlbumComponent implements OnInit {

  albums: Album[] = [];

  constructor(
    private _service: AlbumService,
    private _router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._service.get().subscribe();
    this._service.share.subscribe(albums => {
      this.albums = albums;
    });
  }

  handleError(photo: Photo) {
    photo.signed_image = 'https://placehold.co/100x100/grey/white?text=';
  }

  showDetails(album: Album) {
    this._router.navigate(['/album/details/', album.id]);
  }

  createAlbum(){
    const dialogRef = this.dialog.open(CreateAlbumComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
