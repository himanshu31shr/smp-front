import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../models/base-response.model';
import { People } from '../models/people.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private _http: HttpClient
  ) { }

  getByAlbum(album_id?: any, photo_id?: any) {
    return this._http.get<BaseResponse<People[]>>('people', {
      params: {
        album_id, photo_id
      }
    });
  }


}
