import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { ClienteService } from '../cliente-service';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerForm {
  private readonly fb = inject(FormBuilder);
  private readonly clienteService = inject(ClienteService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly id = Number(this.route.snapshot.paramMap.get('id'));

  protected readonly editing = this.id > 0;
  protected readonly loading = signal(this.editing);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    ativo: [true],
  });

  constructor() {
    if (!this.editing) {
      return;
    }

    this.clienteService.getClienteById(this.id).subscribe({
      next: (cliente) => {
        this.form.setValue({
          nome: cliente.nome,
          email: cliente.email,
          ativo: cliente.ativo,
        });
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar o cliente.');
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
      ? this.clienteService.updateCliente(this.id, dados)
      : this.clienteService.createCliente(dados);

    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (cliente) =>
        this.router.navigate(this.editing ? ['/clientes', cliente.id] : ['/clientes']),
      error: () => this.error.set('Não foi possível salvar o cliente. Tente novamente.'),
    });
  }
}
