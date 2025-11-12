package br.gonme.services;

import br.gonme.entities.Comentario;
import br.gonme.repositories.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public List<Comentario> buscarTodos() {
        return comentarioRepository.findAll();
    }

    public Optional<Comentario> buscarPorId(int id) {
        return comentarioRepository.findById(id);
    }

    public List<Comentario> buscarPorMeme(int memeId) {
        return comentarioRepository.findByMemeIdOrderByDataCriacaoDesc(memeId);
    }

    public Comentario salvar(Comentario comentario) {
        return comentarioRepository.save(comentario);
    }

    public void deletar(int id) {
        comentarioRepository.deleteById(id);
    }
}
