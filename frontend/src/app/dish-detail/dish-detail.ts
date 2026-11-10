import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Prato } from '../prato';
import { PratoService } from '../prato-service';

@Component({
  selector: 'app-dish-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './dish-detail.html',
  styleUrl: './dish-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishDetail {
  private readonly pratoService = inject(PratoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly id = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly prato = signal<Prato | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    if (!this.id) {
      this.loading.set(false);
      this.error.set('Prato não encontrado.');
      return;
    }

    this.pratoService.getDishById(this.id).subscribe({
      next: (prato) => {
        this.prato.set(prato);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar o prato.');
        this.loading.set(false);
      },
    });
  }

  protected remove(): void {
    const prato = this.prato();
    if (!prato || !confirm(`Excluir "${prato.descricao}"?`)) {
      return;
    }

    this.pratoService.deleteDish(prato.id).subscribe({
      next: () => this.router.navigate(['/pratos']),
      error: () =>
        this.error.set('Não foi possível excluir o prato. Ele pode estar em um pedido.'),
    });
  }
}
