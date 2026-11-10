import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { PratoService } from '../prato-service';

@Component({
  selector: 'app-dish-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './dish-form.html',
  styleUrl: './dish-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishForm {
  private readonly fb = inject(FormBuilder);
  private readonly pratoService = inject(PratoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly id = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly editing = this.id > 0;
  protected readonly loading = signal(this.editing);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    descricao: ['', [Validators.required, Validators.minLength(3)]],
    preco: [0, [Validators.required, Validators.min(0.01)]],
  });

  constructor() {
    if (!this.editing) {
      return;
    }

    this.pratoService.getDishById(this.id).subscribe({
      next: (prato) => {
        this.form.setValue({ descricao: prato.descricao, preco: prato.preco });
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar o prato.');
        this.loading.set(false);
      },
    });
  }

  protected submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const dados = this.form.getRawValue();
    const request = this.editing
      ? this.pratoService.updateDish(this.id, dados)
      : this.pratoService.createDish(dados);

    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (prato) =>
        this.router.navigate(this.editing ? ['/pratos', prato.id] : ['/pratos']),
      error: () => this.error.set('Não foi possível salvar o prato. Tente novamente.'),
    });
  }
}
