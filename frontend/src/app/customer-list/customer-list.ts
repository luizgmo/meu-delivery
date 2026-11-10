import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Cliente } from '../cliente';
import { ClienteService } from '../cliente-service';

@Component({
  selector: 'app-customer-list',
  imports: [RouterLink],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerList {
  private readonly clienteService = inject(ClienteService);

  protected readonly clientes = signal<Cliente[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.clienteService.getAllClientes().subscribe({
      next: (clientes) => {
        this.clientes.set(clientes);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os clientes.');
        this.loading.set(false);
      },
    });
  }

  protected remove(cliente: Cliente): void {
    if (!confirm(`Excluir "${cliente.nome}"?`)) {
      return;
    }

    this.clienteService.deleteCliente(cliente.id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Não foi possível excluir o cliente. Ele pode ter pedidos.'),
    });
  }
}
