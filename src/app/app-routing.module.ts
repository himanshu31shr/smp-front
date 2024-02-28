import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [{
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then(e => e.DashboardModule)
  },
  {
    path: 'album',
    loadChildren: () => import('./views/albums/albums.module').then(e => e.AlbumsModule)

  }],
}, {
  loadChildren: () => import('./views/links/links.module').then(e => e.LinksModule),
  path: 'share'
}, {
  loadChildren: () => import('./views/auth/auth.module').then(e => e.AuthModule),
  path: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
