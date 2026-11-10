package edu.ifsp.delivery.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import edu.ifsp.delivery.modelo.Cliente;
import edu.ifsp.delivery.persistencia.ClienteRepositorio;

@RestController
@RequestMapping(path = "/api/cliente", produces = "application/json")
public class ClienteRestController {
	@Autowired
	private ClienteRepositorio repo;

	@GetMapping
	public List<Cliente> listar() {
		return repo.findAll();
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) {
		repo.deleteById(id);
	}

	@PostMapping(consumes = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public Cliente save(@RequestBody Cliente cliente) {
		return repo.save(cliente);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Cliente> update(@PathVariable("id") Integer id, @RequestBody Cliente cliente) {
		Optional<Cliente> opt = repo.findById(id);
		if (opt.isEmpty()) {
			return new ResponseEntity<>((Cliente) null, HttpStatus.NOT_FOUND);
		}

		Cliente existente = opt.get();
		existente.setNome(cliente.getNome());
		existente.setEmail(cliente.getEmail());
		existente.setAtivo(cliente.isAtivo());

		return new ResponseEntity<>(repo.save(existente), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Cliente> findById(@PathVariable("id") Integer id) {
		Optional<Cliente> opt = repo.findById(id);
		if (opt.isPresent()) {
			return new ResponseEntity<>(opt.get(), HttpStatus.OK);
		}

		return new ResponseEntity<>((Cliente) null, HttpStatus.NOT_FOUND);
	}
}
