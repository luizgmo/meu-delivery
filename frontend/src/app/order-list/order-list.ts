import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PedidoResumo } from '../pedido';
import { PedidoService } from '../pedido-service';

@Component({
  selector: 'app-order-list',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderList {
  private readonly pedidoService = inject(PedidoService);

  protected readonly pedidos = signal<PedidoResumo[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly totalGanho = signal(0);

  constructor() {
    this.pedidoService.getAllPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos.set(pedidos);
        this.totalGanho.set(pedidos.reduce((acc, p) => acc + p.total, 0));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os pedidos.');
        this.loading.set(false);
      },
    });
  }

  protected deletar(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este pedido?')) {
      return;
    }

    this.pedidoService.deletePedido(id).subscribe({
      next: () => {
        this.pedidos.set(this.pedidos().filter((p) => p.id !== id));
        this.totalGanho.set(this.pedidos().reduce((acc, p) => acc + p.total, 0));
      },
      error: () => this.error.set('Não foi possível excluir o pedido. Tente novamente.'),
    });
  }
}
