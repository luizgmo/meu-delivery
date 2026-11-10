import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PedidoDetalhe, PedidoResumo } from './pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly url = 'http://localhost:8080/api/pedido';
  private readonly http = inject(HttpClient);

  getAllPedidos(): Observable<PedidoResumo[]> {
    return this.http.get<PedidoResumo[]>(this.url);
  }

  getPedidoById(id: number): Observable<PedidoDetalhe> {
    return this.http.get<PedidoDetalhe>(`${this.url}/${id}`);
  }
}
