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

import edu.ifsp.delivery.modelo.Prato;
import edu.ifsp.delivery.persistencia.PratoRepositorio;

@RestController
@RequestMapping(path = "/api/prato", produces = "application/json")
public class PratoRestController {
	@Autowired
	private PratoRepositorio repo;
	
	@GetMapping
	public List<Prato> listar() {
		return repo.findAll();
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") Integer id) {
		repo.deleteById(id);
	}
	
	@PostMapping(consumes = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public Prato save(@RequestBody Prato prato) {
		return repo.save(prato);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Prato> update(@PathVariable("id") Integer id, @RequestBody Prato prato) {
		Optional<Prato> opt = repo.findById(id);
		if (opt.isEmpty()) {
			return new ResponseEntity<>((Prato) null, HttpStatus.NOT_FOUND);
		}

		Prato existente = opt.get();
		existente.setDescricao(prato.getDescricao());
		existente.setPreco(prato.getPreco());

		return new ResponseEntity<>(repo.save(existente), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Prato> findById(@PathVariable("id") Integer id) {
		Optional<Prato> opt = repo.findById(id);
		if (opt.isPresent()) {
			return new ResponseEntity<>(opt.get(), HttpStatus.OK);
		}
		
		return new ResponseEntity<>((Prato)null, HttpStatus.NOT_FOUND);
	}
	
}
