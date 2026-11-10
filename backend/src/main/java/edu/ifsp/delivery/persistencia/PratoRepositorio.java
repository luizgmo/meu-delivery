package edu.ifsp.delivery.persistencia;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.ifsp.delivery.modelo.Prato;

public interface PratoRepositorio extends JpaRepository<Prato, Integer> {

}
