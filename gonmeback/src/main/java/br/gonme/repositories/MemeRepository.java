package br.gonme.repositories;

import br.gonme.entities.Meme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MemeRepository extends JpaRepository<Meme, Integer> {
    List<Meme> findAllByOrderByDataCriacaoDesc();
    List<Meme> findAllByOrderByVotosDesc();
    List<Meme> findByUsuarioIdOrderByDataCriacaoDesc(int usuarioId);
}
