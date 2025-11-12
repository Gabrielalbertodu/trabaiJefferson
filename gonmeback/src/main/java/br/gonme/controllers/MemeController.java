package br.gonme.controllers;

import br.gonme.entities.Meme;
import br.gonme.services.MemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/meme")
@CrossOrigin(origins = "*")
public class MemeController {

    @Autowired
    private MemeService memeService;

    @GetMapping
    public List<Meme> listarTodos() {
        return memeService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Meme buscarPorId(@PathVariable int id) {
        return memeService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Meme salvar(@RequestBody Meme meme) {
        return memeService.salvar(meme);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id) {
        memeService.deletar(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Meme> listarPorUsuario(@PathVariable int usuarioId) {
        return memeService.buscarPorUsuario(usuarioId);
    }
    
    @GetMapping("/populares")
    public List<Meme> listarPopulares() {
        return memeService.buscarPorVotos();
    }
    
    @PostMapping("/{id}/votar")
    public Meme votar(@PathVariable int id, @RequestParam int valor) {
        return memeService.votar(id, valor);
    }
}