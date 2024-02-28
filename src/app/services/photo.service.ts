import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../models/base-response.model';
import { Photo } from '../models/photo.mode';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient
  ) { }

  create(formdata: FormData) {
    return this.http.post<BaseResponse<Photo>>('photo', formdata);
  }

  getDetails(photo_id: number) {
    return this.http.get<BaseResponse<Photo>>('photo', {
      params: {
        photo_id
      }
    });
  }
}
