package br.gonme.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "meme")
@JsonIgnoreProperties({"comentarios"})
public class Meme {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, length = 200)
    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    @Column(name = "imagem_url", nullable = false, length = 500)
    private String imagemUrl;
    
    @Column(nullable = false)
    private Integer votos = 0;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"memes", "comentarios"})
    private Usuario usuario;
    
    @OneToMany(mappedBy = "meme", cascade = CascadeType.ALL)
    private List<Comentario> comentarios;
    
    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
        if (votos == null) {
            votos = 0;
        }
    }
    
    // Getters e Setters
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public String getImagemUrl() {
        return imagemUrl;
    }
    
    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
    
    public Integer getVotos() {
        return votos;
    }
    
    public void setVotos(Integer votos) {
        this.votos = votos;
    }
    
    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public List<Comentario> getComentarios() {
        return comentarios;
    }
    
    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }
}
