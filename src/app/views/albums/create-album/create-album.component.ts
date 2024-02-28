import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnInit {

  spin = false;

  name = new FormControl('', [Validators.required]);

  constructor(
    private album: AlbumService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  create() {
    this.album.create({
      name: this.name.value
    }).subscribe(response => {
      if (response.status) {
        this.dialog.closeAll();
      }
    })
  }

}
