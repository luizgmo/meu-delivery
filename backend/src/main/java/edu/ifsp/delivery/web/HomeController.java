package edu.ifsp.delivery.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

	@GetMapping("/")
	public String home(
			@RequestParam(
					name = "nome", 
					defaultValue = "usuário") String userName, 
			Model model) {
		
		model.addAttribute("usuario", userName);
		
		return "home";
	}
	
}
