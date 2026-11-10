package edu.ifsp.delivery.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.ifsp.delivery.modelo.Cliente;
import edu.ifsp.delivery.persistencia.ClienteRepositorio;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/cliente")
public class ClienteController {
	
	@Autowired
	private ClienteRepositorio repo;
	
	@GetMapping("/novo")
	public String iniciar(Model model) {
		model.addAttribute("cliente", new Cliente());
		return "cliente/editar";
	}
	
	@PostMapping("/salvar")
	public String salvar(@Valid Cliente cliente, Errors errors) {
		if (errors.hasErrors()) {
			for (var e : errors.getAllErrors()) {
				System.out.println(e);
			}
			
			return "cliente/editar";
		}
		
		System.out.println("ClienteController.salvar()");
		repo.save(cliente);
		return "redirect:/cliente/" + cliente.getId() + "/editar";
	}
	
	@GetMapping("/{id}/editar")
	public String editar(@PathVariable(name = "id") Integer id, Model model) {
		
		Cliente cliente = repo.findById(id).get();
		model.addAttribute("cliente", cliente);
		
		return "cliente/editar";
	}
	
	@GetMapping("/listar")
	public String listar(Model model) {
		Iterable<Cliente> clientes = repo.findAll();
		
		model.addAttribute("clientes", clientes);
				
		return "cliente/listar";
	}
	
	@PostMapping("/{id}/excluir")
	public String excluir(
			@PathVariable(name = "id") Integer id,
			RedirectAttributes redirectAttributes
			) {
		
		repo.deleteById(id);		
		redirectAttributes.addFlashAttribute("deleteOk", id);
		
		return "redirect:/cliente/listar";
	}
	
	
}
