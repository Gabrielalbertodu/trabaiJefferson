package br.gonme.services;

import br.gonme.entities.Meme;
import br.gonme.repositories.MemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MemeService {

    @Autowired
    private MemeRepository memeRepository;

    public List<Meme> buscarTodos() {
        return memeRepository.findAllByOrderByDataCriacaoDesc();
    }

    public List<Meme> buscarPorVotos() {
        return memeRepository.findAllByOrderByVotosDesc();
    }

    public Optional<Meme> buscarPorId(int id) {
        return memeRepository.findById(id);
    }

    public Meme salvar(Meme meme) {
        return memeRepository.save(meme);
    }

    public void deletar(int id) {
        memeRepository.deleteById(id);
    }

    public Meme votar(int id, int valor) {
        Optional<Meme> memeOpt = memeRepository.findById(id);
        if (memeOpt.isPresent()) {
            Meme meme = memeOpt.get();
            meme.setVotos(meme.getVotos() + valor);
            return memeRepository.save(meme);
        }
        return null;
    }

    public List<Meme> buscarPorUsuario(int usuarioId) {
        return memeRepository.findByUsuarioIdOrderByDataCriacaoDesc(usuarioId);
    }
}
