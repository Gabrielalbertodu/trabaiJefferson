DROP DATABASE IF EXISTS gonme;
CREATE DATABASE gonme;
USE gonme;

-- criar usuario mysql
CREATE USER IF NOT EXISTS 'gonme_app'@'localhost' IDENTIFIED BY 'Gonme@2024';
GRANT SELECT, INSERT, UPDATE, DELETE ON gonme.* TO 'gonme_app'@'localhost';
FLUSH PRIVILEGES;

DROP TABLE IF EXISTS comentario;
DROP TABLE IF EXISTS meme;
DROP TABLE IF EXISTS usuario_grupo;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS grupos_usuarios;

CREATE TABLE grupos_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT,
    permissoes JSON,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: usuario (OBRIGATÓRIA)
-- =====================================================
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    foto_perfil VARCHAR(500),
    biografia TEXT,
    total_memes INT DEFAULT 0, -- Contador atualizado por TRIGGER
    total_comentarios INT DEFAULT 0, -- Contador atualizado por TRIGGER
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: usuario_grupo (Relacionamento N:N)
-- Um usuário pode pertencer a vários grupos
-- =====================================================
CREATE TABLE usuario_grupo (
    usuario_id INT NOT NULL,
    grupo_id INT NOT NULL,
    data_atribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, grupo_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (grupo_id) REFERENCES grupos_usuarios(id) ON DELETE CASCADE
);

CREATE TABLE meme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    imagem_url VARCHAR(500) NOT NULL,
    votos INT DEFAULT 0,
    usuario_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE comentario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    meme_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (meme_id) REFERENCES meme(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- =====================================================
-- ÍNDICES (Melhoram performance de consultas)
-- =====================================================
-- ÍNDICE 1: Buscar memes por usuário (usado frequentemente no sistema)
CREATE INDEX idx_meme_usuario ON meme(usuario_id);

-- ÍNDICE 2: Ordenar memes por votos (lista de populares)
CREATE INDEX idx_meme_votos ON meme(votos DESC);

-- ÍNDICE 3: Buscar comentários por meme (ao abrir detalhes do meme)
CREATE INDEX idx_comentario_meme ON comentario(meme_id);

-- ÍNDICE 4: Buscar usuários por email (login)
CREATE INDEX idx_usuario_email ON usuario(email);

-- =====================================================
-- TRIGGERS
-- =====================================================
-- TRIGGER 1: Atualizar contador de memes do usuário automaticamente
DELIMITER $$
CREATE TRIGGER trg_incrementar_total_memes
AFTER INSERT ON meme
FOR EACH ROW
BEGIN
    UPDATE usuario 
    SET total_memes = total_memes + 1 
    WHERE id = NEW.usuario_id;
END$$
DELIMITER ;

-- TRIGGER 2: Atualizar contador de comentários do usuário
DELIMITER $$
CREATE TRIGGER trg_incrementar_total_comentarios
AFTER INSERT ON comentario
FOR EACH ROW
BEGIN
    UPDATE usuario 
    SET total_comentarios = total_comentarios + 1 
    WHERE id = NEW.usuario_id;
END$$
DELIMITER ;

-- TRIGGER 3: Decrementar contador ao deletar meme
DELIMITER $$
CREATE TRIGGER trg_decrementar_total_memes
AFTER DELETE ON meme
FOR EACH ROW
BEGIN
    UPDATE usuario 
    SET total_memes = GREATEST(total_memes - 1, 0)
    WHERE id = OLD.usuario_id;
END$$
DELIMITER ;

-- =====================================================
-- VIEWS
-- =====================================================
-- VIEW 1: Memes Populares (acima da média de votos)
CREATE VIEW view_memes_populares AS
SELECT 
    m.id,
    m.titulo,
    m.descricao,
    m.imagem_url,
    m.votos,
    m.data_criacao,
    u.nome AS autor,
    u.email AS autor_email,
    (SELECT COUNT(*) FROM comentario WHERE meme_id = m.id) AS total_comentarios
FROM meme m
INNER JOIN usuario u ON m.usuario_id = u.id
WHERE m.votos >= (SELECT AVG(votos) FROM meme)
ORDER BY m.votos DESC;

-- VIEW 2: Usuários Ativos (com estatísticas)
CREATE VIEW view_usuarios_ativos AS
SELECT 
    u.id,
    u.nome,
    u.email,
    u.total_memes,
    u.total_comentarios,
    (u.total_memes + u.total_comentarios) AS atividade_total,
    GROUP_CONCAT(g.nome SEPARATOR ', ') AS grupos,
    u.data_criacao
FROM usuario u
LEFT JOIN usuario_grupo ug ON u.id = ug.usuario_id
LEFT JOIN grupos_usuarios g ON ug.grupo_id = g.id
GROUP BY u.id, u.nome, u.email, u.total_memes, u.total_comentarios, u.data_criacao
HAVING atividade_total > 0
ORDER BY atividade_total DESC;

-- =====================================================
-- FUNCTIONS
-- =====================================================
-- FUNCTION 1: Gerar ID customizado para identificação de memes
DELIMITER $$
CREATE FUNCTION fn_gerar_codigo_meme(meme_id INT, usuario_id INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    RETURN CONCAT('MEME-', LPAD(usuario_id, 4, '0'), '-', LPAD(meme_id, 6, '0'));
END$$
DELIMITER ;

-- FUNCTION 2: Calcular popularidade (score) de um meme
DELIMITER $$
CREATE FUNCTION fn_calcular_score_meme(meme_id INT)
RETURNS DECIMAL(10,2)
READS SQL DATA
BEGIN
    DECLARE votos INT;
    DECLARE comentarios INT;
    DECLARE dias_publicado INT;
    
    SELECT m.votos, COUNT(c.id), DATEDIFF(NOW(), m.data_criacao)
    INTO votos, comentarios, dias_publicado
    FROM meme m
    LEFT JOIN comentario c ON m.id = c.meme_id
    WHERE m.id = meme_id
    GROUP BY m.id, m.votos, m.data_criacao;
    
    -- Score: (votos * 2 + comentários * 5) / (dias + 1)
    RETURN (votos * 2 + comentarios * 5) / (dias_publicado + 1);
END$$
DELIMITER ;

-- =====================================================
-- PROCEDURES
-- =====================================================
-- PROCEDURE 1: Atualizar ranking de usuários (pode ser executada periodicamente)
DELIMITER $$
CREATE PROCEDURE sp_atualizar_ranking_usuarios()
BEGIN
    -- Recalcula totais (caso haja inconsistência)
    UPDATE usuario u
    SET u.total_memes = (SELECT COUNT(*) FROM meme WHERE usuario_id = u.id),
        u.total_comentarios = (SELECT COUNT(*) FROM comentario WHERE usuario_id = u.id);
    
    SELECT 'Ranking atualizado com sucesso!' AS mensagem;
END$$
DELIMITER ;

-- PROCEDURE 2: Limpar memes inativos (sem votos e comentários há mais de 90 dias)
DELIMITER $$
CREATE PROCEDURE sp_limpar_memes_inativos()
BEGIN
    DECLARE memes_deletados INT;
    
    DELETE FROM meme
    WHERE votos = 0
    AND id NOT IN (SELECT DISTINCT meme_id FROM comentario)
    AND DATEDIFF(NOW(), data_criacao) > 90;
    
    SET memes_deletados = ROW_COUNT();
    
    SELECT CONCAT('Foram removidos ', memes_deletados, ' memes inativos.') AS resultado;
END$$
DELIMITER ;

-- =====================================================
-- DADOS INICIAIS
-- =====================================================

-- Inserir grupos de usuários
INSERT INTO grupos_usuarios (nome, descricao, permissoes) VALUES
('Administrador', 'Acesso total ao sistema', '{"criar_meme": true, "editar_meme": true, "deletar_meme": true, "deletar_qualquer_meme": true, "gerenciar_usuarios": true}'),
('Usuário Comum', 'Usuário padrão do sistema', '{"criar_meme": true, "editar_meme": true, "deletar_meme": true, "deletar_qualquer_meme": false, "gerenciar_usuarios": false}'),
('Moderador', 'Pode moderar conteúdo', '{"criar_meme": true, "editar_meme": true, "deletar_meme": true, "deletar_qualquer_meme": true, "gerenciar_usuarios": false}'),
('Visitante', 'Apenas visualização', '{"criar_meme": false, "editar_meme": false, "deletar_meme": false, "deletar_qualquer_meme": false, "gerenciar_usuarios": false}');

INSERT INTO usuario (nome, email, senha) VALUES
('João Silva', 'joao@email.com', '123456'),
('Maria Santos', 'maria@email.com', '123456'),
('Pedro Costa', 'pedro@email.com', '123456');

-- Atribuir grupos aos usuários
INSERT INTO usuario_grupo (usuario_id, grupo_id) VALUES
(1, 1), -- João é Administrador
(2, 2), -- Maria é Usuário Comum
(3, 3); -- Pedro é Moderador

INSERT INTO meme (titulo, descricao, imagem_url, votos, usuario_id) VALUES
('Meme Engraçado', 'Primeiro meme do sistema', 'https://via.placeholder.com/500', 15, 1),
('Gato Fofo', 'Meme de gatinho', 'https://via.placeholder.com/500', 23, 2),
('Programação', 'Meme sobre código', 'https://via.placeholder.com/500', 18, 1);

INSERT INTO comentario (texto, meme_id, usuario_id) VALUES
('Muito engraçado!', 1, 2),
('Adorei esse meme', 1, 3),
('Que fofo!', 2, 1);
