import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Album } from 'src/app/models/album.modell';
import { Link } from 'src/app/models/link.model';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-create-share-link',
  templateUrl: './create-share-link.component.html',
  styleUrls: ['./create-share-link.component.scss']
})
export class CreateShareLinkComponent implements OnInit {

  links: Link[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public album: Album,
    private service: LinkService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.share.subscribe(data => {
      this.links = data;
    });

    this.service.get(this.album.id).subscribe();
  }

  permissionsForm = new FormGroup({
    permissionType: new FormControl('full')
  });

  permissions = ['Read', 'Write', 'Delete', 'Update'];

  submitForm() {
    this.service.createLink((this.permissionsForm.value.permissionType) == 'full' ? 1 : 0, this.album.id).subscribe((response) => {
      if(response.status) {
        this.snack.open('Link created!', undefined, { duration: 2500 });
        this.dialog.closeAll();
      }
    });
  }
}
