package br.gonme.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuario")
@JsonIgnoreProperties({"memes", "comentarios"})
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(nullable = false, length = 100)
    private String senha;
    
    @Column(name = "foto_perfil", length = 500)
    private String fotoPerfil;
    
    @Column(columnDefinition = "TEXT")
    private String biografia;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Meme> memes;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Comentario> comentarios;
    
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
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSenha() {
        return senha;
    }
    
    public void setSenha(String senha) {
        this.senha = senha;
    }
    
    public String getFotoPerfil() {
        return fotoPerfil;
    }
    
    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }
    
    public String getBiografia() {
        return biografia;
    }
    
    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }
    
    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    
    public List<Meme> getMemes() {
        return memes;
    }
    
    public void setMemes(List<Meme> memes) {
        this.memes = memes;
    }
    
    public List<Comentario> getComentarios() {
        return comentarios;
    }
    
    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }
}
