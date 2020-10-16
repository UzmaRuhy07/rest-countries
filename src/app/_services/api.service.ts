import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(endpoint : string, params?: {}) {
      return this.http.get(`${environment.baseUrl}/${endpoint}`, params);
  }

}
