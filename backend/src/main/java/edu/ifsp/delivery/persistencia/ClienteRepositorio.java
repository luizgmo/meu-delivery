package edu.ifsp.delivery.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.ifsp.delivery.modelo.Cliente;

public interface ClienteRepositorio extends JpaRepository<Cliente, Integer> {
	
}
