import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly url = 'http://localhost:8080/api/cliente';
  private readonly http = inject(HttpClient);

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  createCliente(cliente: Omit<Cliente, 'id'>): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }

  updateCliente(id: number, cliente: Omit<Cliente, 'id'>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
