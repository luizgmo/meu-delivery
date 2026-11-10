export interface PedidoItem {
  id: number;
  pratoId: number;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface PedidoResumo {
  id: number;
  dataCriacao: string;
  clienteId: number;
  clienteNome: string;
  total: number;
  quantidadeItens: number;
}

export interface PedidoDetalhe extends PedidoResumo {
  itens: PedidoItem[];
}
