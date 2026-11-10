import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PedidoDetalhe } from '../pedido';
import { PedidoService } from '../pedido-service';

@Component({
  selector: 'app-order-detail',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetail {
  private readonly pedidoService = inject(PedidoService);
  private readonly route = inject(ActivatedRoute);
  private readonly id = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly pedido = signal<PedidoDetalhe | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    if (!this.id) {
      this.loading.set(false);
      this.error.set('Pedido não encontrado.');
      return;
    }

    this.pedidoService.getPedidoById(this.id).subscribe({
      next: (pedido) => {
        this.pedido.set(pedido);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar o pedido.');
        this.loading.set(false);
      },
    });
  }
}
