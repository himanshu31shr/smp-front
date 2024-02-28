import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../models/base-response.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Link } from '../models/link.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  readonly content: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>([]);

  readonly share: Observable<Link[]> = this.content.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  get(album_id: number) {
    return this.http.get<BaseResponse<Link[]>>('/album/link', {
      params: {
        album_id
      }
    }).pipe(
      tap(response => {
        if(response.status) {
          this.content.next(response.payload);
        }
      })
    );
  }

  createLink(access_type: number, album_id: number) {
    return this.http.post<BaseResponse<Link>>('/album/link', {
      access_type, album_id
    }).pipe(
      tap(
        (response) => {
          if(response.status) {
            this.get(album_id);
          }
        }
      )
    );
  }
}
