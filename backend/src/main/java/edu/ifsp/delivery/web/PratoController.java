package edu.ifsp.delivery.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.ifsp.delivery.modelo.Prato;
import edu.ifsp.delivery.persistencia.PratoRepositorio;

@Controller
@RequestMapping("/prato")
public class PratoController {
	@Autowired
	private PratoRepositorio repo;
	
	@GetMapping("/listar")
	public String listar(Model model) {
		List<Prato> pratos = repo.findAll();
		model.addAttribute("pratos", pratos);
		return "prato/listar";
	}
}
