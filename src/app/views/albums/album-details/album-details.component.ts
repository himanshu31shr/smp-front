import { CreateShareLinkComponent } from './../create-share-link/create-share-link.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/album.modell';
import { AlbumService } from 'src/app/services/album.service';
import { PeopleService } from 'src/app/services/people.service';
import { DropzoneComponent } from 'src/app/shared/dropzone/dropzone.component';
import { PhotoModalComponent } from 'src/app/shared/photo-modal/photo-modal.component';
import { People } from './../../../models/people.model';
import { Photo } from './../../../models/photo.mode';

export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  album: Album | undefined;

  people: People[] = [];

  files: FileHandle[] = [];

  name = new FormControl('', [Validators.required]);

  edit = false;

  filters: {
    people_id?: number,
    photo_id?: number[]
  } = {};

  showFull = false;

  constructor(
    private _service: AlbumService,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _peopleService: PeopleService,
    private sanitizer: DomSanitizer,
    private _router: Router
  ) { }

  toggleFull() {
    this.showFull = !this.showFull;
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  toggleEdit(): void {
    this.edit = !this.edit;
    this.name.patchValue(this.album?.name || '')
  }

  update() {

    if (this.name.invalid) {
      alert('error')
      return;
    }

    this._service.put(this.album?.id, this.name.value || '').subscribe(response => {
      if (response.status) {
        this.edit = false;
      }
    });
  }

  ngOnInit(): void {

    this._service.singleShare.subscribe((album: Album) => {
      if (album.photos) {
        this.album = album;
        this.album.photos = this.album.photos.sort((a, b) => a.id - b.id);
      }
    });

    this._route.paramMap.subscribe((params) => {
      this._service.getById(params?.get('id')).subscribe();

      this._peopleService.getByAlbum(params?.get('id')).subscribe((response) => {
        if (response.status) {
          this.people = response.payload;
        }
      });
      return params;
    });

  }

  deleteAlbum() {
    this._service.destroy(this.album?.id!).subscribe(
      (response) => {
        if(response.status){
          this._router.navigate(['/']);
        }
      }
    )
  }

  get peps() {
    if (this.showFull) {
      return this.people.filter(peo => !peo.isSelected);
    }

    return this.people.filter(peo => !peo.isSelected).slice(0, 25);
  }

  handleError({ id }: Photo) {
    if (this.album && this.album.photos) {
      this.album.photos = this.album?.photos.filter(photo => photo.id !== id);
    }
  }

  open(photo: Photo) {
    const dialogRef = this.dialog.open(PhotoModalComponent, {
      data: {
        "photo": photo,
        "album": this.album
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openUpload() {
    const diag = this.dialog.open(DropzoneComponent, {
      data: this.album
    });

    diag.afterClosed().subscribe(result => {
      this._service.getById(this.album?.id).subscribe();

      this._peopleService.getByAlbum(this.album?.id).subscribe((response) => {
        if (response.status) {
          this.people = response.payload;
        }
      });
    })
  }

  filter(people: People) {

    if (people.isSelected) {
      people.isSelected = false;
      const photo_ids = people.photo_has_people?.map(pe => pe.photoId)

      this.filters.photo_id = this.filters.photo_id?.filter(id => !photo_ids?.includes(id));
    } else {
      people.isSelected = true;
      this.filters.photo_id = [
        ...(people.photo_has_people ?? []).map(pe => pe.photoId),
        ...(this.filters.photo_id || [])
      ]
    }
  }

  get selected() {
    return this.people.filter(peo => peo.isSelected === true)
  }

  get photos() {
    return this.album?.photos.filter(photo => {
      let pass = true;
      if (this.filters && this.filters.photo_id && this.filters.photo_id.length) {
        if (!this.filters.photo_id.includes(photo.id)) {
          pass = false;
        }
      }
      return pass;
    });
  }

  createShareLink() {
    const diag = this.dialog.open(CreateShareLinkComponent, {
      data: this.album
    });

    diag.afterClosed().subscribe(result => {
      this._service.getById(this.album?.id).subscribe();

      this._peopleService.getByAlbum(this.album?.id).subscribe((response) => {
        if (response.status) {
          this.people = response.payload;
        }
      });
    })
  }

  clearFilters(){
    this.filters = {};
    this.people.map(peopl => peopl.isSelected = false)
  }
}

