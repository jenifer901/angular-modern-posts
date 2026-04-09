import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = `/api`;

  http = inject(HttpClient);

  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  getById(endpoint: string, id: number) {
    return this.http.get(`${this.baseUrl}/${endpoint}/${id}`);
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  put(endpoint: string, id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number) {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
