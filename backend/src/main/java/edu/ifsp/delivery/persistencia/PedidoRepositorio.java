package edu.ifsp.delivery.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.ifsp.delivery.modelo.Pedido;

public interface PedidoRepositorio extends JpaRepository<Pedido, Integer>{

}
