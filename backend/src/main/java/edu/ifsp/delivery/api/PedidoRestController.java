package edu.ifsp.delivery.api;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.ifsp.delivery.modelo.Pedido;
import edu.ifsp.delivery.modelo.PedidoItem;
import edu.ifsp.delivery.persistencia.PedidoRepositorio;

@RestController
@RequestMapping(path = "/api/pedido", produces = "application/json")
@Transactional(readOnly = true)
public class PedidoRestController {
	@Autowired
	private PedidoRepositorio repo;

	public record ItemDTO(
			Integer id,
			Integer pratoId,
			String descricao,
			int quantidade,
			double precoUnitario,
			double subtotal) {
	}

	public record PedidoResumoDTO(
			Integer id,
			Date dataCriacao,
			Integer clienteId,
			String clienteNome,
			double total,
			int quantidadeItens) {
	}

	public record PedidoDetalheDTO(
			Integer id,
			Date dataCriacao,
			Integer clienteId,
			String clienteNome,
			double total,
			int quantidadeItens,
			List<ItemDTO> itens) {
	}

	@GetMapping
	public List<PedidoResumoDTO> listar() {
		return repo.findAll().stream().map(this::toResumo).toList();
	}

	@GetMapping("/{id}")
	public ResponseEntity<PedidoDetalheDTO> findById(@PathVariable("id") Integer id) {
		return repo.findById(id)
				.map(pedido -> ResponseEntity.ok(toDetalhe(pedido)))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	private PedidoResumoDTO toResumo(Pedido pedido) {
		double total = 0;
		int quantidade = 0;

		for (PedidoItem item : pedido.getItens()) {
			total += item.getPrato().getPreco() * item.getQuantidade();
			quantidade += item.getQuantidade();
		}

		return new PedidoResumoDTO(
				pedido.getId(),
				pedido.getDataCriacao(),
				pedido.getCliente().getId(),
				pedido.getCliente().getNome(),
				total,
				quantidade);
	}

	private PedidoDetalheDTO toDetalhe(Pedido pedido) {
		double total = 0;
		int quantidade = 0;
		List<ItemDTO> itens = new java.util.ArrayList<>();

		for (PedidoItem item : pedido.getItens()) {
			double precoUnitario = item.getPrato().getPreco();
			double subtotal = precoUnitario * item.getQuantidade();

			total += subtotal;
			quantidade += item.getQuantidade();

			itens.add(new ItemDTO(
					item.getId(),
					item.getPrato().getId(),
					item.getPrato().getDescricao(),
					item.getQuantidade(),
					precoUnitario,
					subtotal));
		}

		return new PedidoDetalheDTO(
				pedido.getId(),
				pedido.getDataCriacao(),
				pedido.getCliente().getId(),
				pedido.getCliente().getNome(),
				total,
				quantidade,
				itens);
	}
}
