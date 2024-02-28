import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAlbumComponent } from './list-album/list-album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

const routes: Routes = [{
  path: '',
  component: ListAlbumComponent
}, {
  path: 'add',
  component: CreateAlbumComponent
}, {
  path: 'details/:id',
  component: AlbumDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule { }
