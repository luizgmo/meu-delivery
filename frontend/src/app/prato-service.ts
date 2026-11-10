import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Prato } from './prato';

@Injectable({
  providedIn: 'root',
})
export class PratoService {
  private readonly url = 'http://localhost:8080/api/prato';
  private readonly http = inject(HttpClient);

  getAllDishes(): Observable<Prato[]> {
    return this.http.get<Prato[]>(this.url);
  }

  getDishById(id: number): Observable<Prato> {
    return this.http.get<Prato>(`${this.url}/${id}`);
  }

  createDish(prato: Omit<Prato, 'id'>): Observable<Prato> {
    return this.http.post<Prato>(this.url, prato);
  }

  updateDish(id: number, prato: Omit<Prato, 'id'>): Observable<Prato> {
    return this.http.put<Prato>(`${this.url}/${id}`, prato);
  }

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
