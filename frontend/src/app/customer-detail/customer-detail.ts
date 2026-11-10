import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Cliente } from '../cliente';
import { ClienteService } from '../cliente-service';

@Component({
  selector: 'app-customer-detail',
  imports: [RouterLink],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDetail {
  private readonly clienteService = inject(ClienteService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly id = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly cliente = signal<Cliente | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    if (!this.id) {
      this.loading.set(false);
      this.error.set('Cliente não encontrado.');
      return;
    }

    this.clienteService.getClienteById(this.id).subscribe({
      next: (cliente) => {
        this.cliente.set(cliente);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar o cliente.');
        this.loading.set(false);
      },
    });
  }

  protected remove(): void {
    const cliente = this.cliente();
    if (!cliente || !confirm(`Excluir "${cliente.nome}"?`)) {
      return;
    }

    this.clienteService.deleteCliente(cliente.id).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: () => this.error.set('Não foi possível excluir o cliente. Ele pode ter pedidos.'),
    });
  }
}
