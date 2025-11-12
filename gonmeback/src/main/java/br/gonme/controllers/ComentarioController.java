package br.gonme.controllers;

import br.gonme.entities.Comentario;
import br.gonme.services.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comentario")
@CrossOrigin(origins = "*")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @GetMapping
    public List<Comentario> listarTodos() {
        return comentarioService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Comentario buscarPorId(@PathVariable int id) {
        return comentarioService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Comentario salvar(@RequestBody Comentario comentario) {
        return comentarioService.salvar(comentario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id) {
        comentarioService.deletar(id);
    }

    @GetMapping("/meme/{memeId}")
    public List<Comentario> listarPorMeme(@PathVariable int memeId) {
        return comentarioService.buscarPorMeme(memeId);
    }
}