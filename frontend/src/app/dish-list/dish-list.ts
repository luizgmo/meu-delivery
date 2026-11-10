import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Prato } from '../prato';
import { PratoService } from '../prato-service';

@Component({
  selector: 'app-dish-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './dish-list.html',
  styleUrl: './dish-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishList {
  private readonly pratoService = inject(PratoService);

  protected readonly pratos = signal<Prato[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.pratoService.getAllDishes().subscribe({
      next: (pratos) => {
        this.pratos.set(pratos);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os pratos.');
        this.loading.set(false);
      },
    });
  }

  protected remove(prato: Prato): void {
    if (!confirm(`Excluir "${prato.descricao}"?`)) {
      return;
    }

    this.pratoService.deleteDish(prato.id).subscribe({
      next: () => this.load(),
      error: () =>
        this.error.set('Não foi possível excluir o prato. Ele pode estar em um pedido.'),
    });
  }
}
