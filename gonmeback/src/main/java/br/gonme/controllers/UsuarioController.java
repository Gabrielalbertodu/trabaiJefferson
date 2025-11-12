package br.gonme.controllers;

import br.gonme.entities.Usuario;
import br.gonme.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable int id) {
        return usuarioService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Usuario salvar(@RequestBody Usuario usuario) {
        return usuarioService.salvar(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id) {
        usuarioService.deletar(id);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        return usuarioService.buscarPorEmailESenha(usuario.getEmail(), usuario.getSenha());
    }
}