import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { Cliente } from '../cliente';
import { Prato } from '../prato';
import { ClienteService } from '../cliente-service';
import { PratoService } from '../prato-service';
import { PedidoService } from '../pedido-service';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderForm {
  private readonly fb = inject(FormBuilder);
  private readonly pedidoService = inject(PedidoService);
  private readonly clienteService = inject(ClienteService);
  private readonly pratoService = inject(PratoService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly clientes = signal<Cliente[]>([]);
  protected readonly pratos = signal<Prato[]>([]);

  protected readonly form = this.fb.nonNullable.group({
    clienteId: [0, [Validators.required]],
    itens: this.fb.nonNullable.array([]),
  });

  protected readonly itens = this.form.controls.itens as FormArray;

  constructor() {
    this.clienteService.getAllClientes().subscribe({
      next: (clientes) => this.clientes.set(clientes),
      error: () => this.error.set('Não foi possível carregar os clientes.'),
    });

    this.pratoService.getAllDishes().subscribe({
      next: (pratos) => this.pratos.set(pratos),
      error: () => this.error.set('Não foi possível carregar os pratos.'),
    });

    this.addItem();
  }

  protected addItem(): void {
    const itemGroup = this.fb.nonNullable.group({
      pratoId: [0, [Validators.required]],
      quantidade: [1, [Validators.required, Validators.min(1)]],
    });
    this.itens.push(itemGroup);
  }

  protected removeItem(index: number): void {
    this.itens.removeAt(index);
    if (this.itens.length === 0) {
      this.addItem();
    }
  }

  protected submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const dados = this.form.getRawValue() as { clienteId: number; itens: { pratoId: number; quantidade: number }[] };
    const request = {
      clienteId: dados.clienteId,
      itens: dados.itens.map((item) => ({
        pratoId: item.pratoId,
        quantidade: item.quantidade,
      })),
    };

    this.pedidoService
      .createPedido(request)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/pedidos']),
        error: () => this.error.set('Não foi possível salvar o pedido. Tente novamente.'),
      });
  }
}
