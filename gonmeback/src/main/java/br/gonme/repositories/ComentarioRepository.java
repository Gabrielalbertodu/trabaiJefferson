package br.gonme.repositories;

import br.gonme.entities.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    List<Comentario> findByMemeIdOrderByDataCriacaoDesc(int memeId);
}
