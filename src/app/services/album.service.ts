import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../models/base-response.model';
import { Album } from '../models/album.modell';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { People } from '../models/people.model';
import { Photo } from '../models/photo.mode';
import { Link } from '../models/link.model';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  readonly content: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);

  readonly share: Observable<Album[]> = this.content.asObservable();

  readonly singleContent: BehaviorSubject<Album> = new BehaviorSubject<Album | any>({});

  readonly singleShare: Observable<Album | any> = this.singleContent.asObservable();

  albums: Album[] = [];

  constructor(
    public http: HttpClient
  ) {
    this.init();

  }

  init() {
    this.get()
      .subscribe((response) => {
        if (response.status) {
          this.content.next(response.payload);
          this.albums = response.payload;
        }
      });
  }

  get() {
    return this.http.get<BaseResponse<Album[]>>('album');
  }

  put(album_id: any, name: string) {
    return this.http.put<BaseResponse<Album>>('album', {
      album_id, name
    }).pipe(
      tap({
        next: (response) => {
          if (response.status) {
            this.albums.map(album => {
              if (album.id === album_id) {
                album.name = name;
                this.singleContent.next(album);
              }
            });

            this.content.next(this.albums);
          }
        }
      })
    )
  }

  getByCode(code: string) {
    return this.http.get<BaseResponse<Link>>('album/code', {
      params: {
        code
      }
    });
  }

  create(request: any) {
    return this.http.post<BaseResponse<Album>>('album', request).pipe(
      tap({
        next: (response) => {
          if (response.status) {
            this.init();
          }
        }
      })
    );
  }

  getById(id: any) {
    this.albums.map((album) => {
      if (album.id === id) {
        this.singleContent.next(album);
      }
    });

    return this.http.get<BaseResponse<Album>>('album', {
      params: {
        id
      }
    }).pipe(
      tap({
        next: (event) => {
          if (event.status) {
            this.singleContent.next(event.payload);
          }
        }
      })
    );
  }

  getMatch(form: FormData) {
    return this.http.post<BaseResponse<People[]>>('match/get-match', form);
  }

  getByPeople(people_id: string[], album_id?: number){
    return this.http.get<BaseResponse<Photo[] | Album>>('photo/public', {
      params: {
        people_id,
        album_id: album_id ?? 0,
      }
    });
  }

  destroy(album_id: number) {
    return this.http.delete<BaseResponse<{}>>('/album', {
      params: {
        album_id
      }
    }).pipe(
      tap({
        next: (event) => {
          if (event.status) {
            this.singleContent.next({} as any);
            this.init();
          }
        }
      })
    );
  }
}
