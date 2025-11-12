package br.gonme.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comentario")
public class Comentario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;
    
    @ManyToOne
    @JoinColumn(name = "meme_id", nullable = false)
    private Meme meme;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
    }
    
    // Getters e Setters
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getTexto() {
        return texto;
    }
    
    public void setTexto(String texto) {
        this.texto = texto;
    }
    
    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    
    public Meme getMeme() {
        return meme;
    }
    
    public void setMeme(Meme meme) {
        this.meme = meme;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
