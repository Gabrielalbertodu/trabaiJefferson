package br.gonme.services;

import br.gonme.entities.Usuario;
import br.gonme.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> buscarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(int id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deletar(int id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario buscarPorEmailESenha(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }
}
