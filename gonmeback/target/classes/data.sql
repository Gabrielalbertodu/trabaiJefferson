CREATE DATABASE IF NOT EXISTS gonme;
USE gonme;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE comentario;
TRUNCATE TABLE meme;
TRUNCATE TABLE usuario;
SET FOREIGN_KEY_CHECKS = 1;

-- senha hash bcrypt: senha123
INSERT INTO usuario (id, nome, email, senha, foto_perfil, biografia, data_criacao) VALUES
(1, 'Carlos Memer', 'carlos@gonme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://i.pravatar.cc/150?img=12', 'Rei dos memes desde 2010', NOW()),
(2, 'Julia Engraçada', 'julia@gonme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://i.pravatar.cc/150?img=5', 'Se não tem meme, eu invento', NOW()),
(3, 'Roberto Dev', 'roberto@gonme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://i.pravatar.cc/150?img=33', 'Programador e mememaker nas horas vagas', NOW()),
(4, 'Amanda Risadas', 'amanda@gonme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://i.pravatar.cc/150?img=9', 'Colecionadora de memes raros', NOW()),
(5, 'Felipe Zueira', 'felipe@gonme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://i.pravatar.cc/150?img=15', 'Nunca levo nada a serio', NOW()),
(6, 'Beatriz LOL', 'beatriz@gonme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://i.pravatar.cc/150?img=20', 'Memes > Vida real', NOW());

INSERT INTO meme (id, titulo, descricao, imagem_url, votos, data_criacao, usuario_id) VALUES
(1, 'Eu explicando algo vs Ninguem me escutando', 'Aquele momento classico', 'https://i.imgflip.com/2fm6x.jpg', 156, NOW(), 1),
(2, 'Expectativa vs Realidade de acordar cedo', 'Todo santo dia a mesma coisa', 'https://i.imgflip.com/3si4.jpg', 234, NOW(), 2),
(3, 'Quando alguem toca no meu celular sem permissao', 'Respeita a privacidade alheia', 'https://i.imgflip.com/4acd7.jpg', 189, NOW(), 3),
(4, 'Professor: A prova vai ser facil. A prova:', 'Mentira deslavada', 'https://i.imgflip.com/30b1gx.jpg', 312, NOW(), 4),
(5, 'Eu: Vou dormir cedo hoje. Tambem eu as 3 da manha:', 'Nunca funciona esse plano', 'https://i.imgflip.com/1bij.jpg', 267, NOW(), 1),
(6, 'Quando o codigo funciona e voce nao sabe porque', 'Magia negra da programacao', 'https://i.imgflip.com/2hgfw.jpg', 423, NOW(), 3),
(7, 'Minha mae: Pausa o jogo. Eu:', 'MÃE É ONLINE NAO DÁ PRA PAUSAR', 'https://i.imgflip.com/4t0m5.jpg', 198, NOW(), 5),
(8, 'Segunda-feira chegando:', 'Por que inventaram segunda-feira?', 'https://i.imgflip.com/3lmzyx.jpg', 345, NOW(), 2),
(9, 'Eu fingindo que entendi a materia', 'Professor acreditando', 'https://i.imgflip.com/26am.jpg', 276, NOW(), 4),
(10, 'Quando vejo comida gratis:', 'Velocidade maxima ativada', 'https://i.imgflip.com/1g8my.jpg', 412, NOW(), 6),
(11, 'Eu tentando economizar vs Meu dinheiro:', 'Tchau dinheirinho', 'https://i.imgflip.com/3oevdk.jpg', 298, NOW(), 2),
(12, 'Quando alguem pergunta se estou bem:', 'Mentindo com classe', 'https://i.imgflip.com/5j3q5.jpg', 187, NOW(), 1),
(13, 'Eu aos 12 anos vs Eu agora:', 'Como as coisas mudaram', 'https://i.imgflip.com/261o3j.jpg', 324, NOW(), 5),
(14, 'Quando termina a aula e o professor:', '"Esperem, tenho um aviso"', 'https://i.imgflip.com/1ihzfe.jpg', 256, NOW(), 4),
(15, 'Meu cerebro: Nao faz isso. Eu:', 'Vou fazer mesmo assim', 'https://i.imgflip.com/3pnr0f.jpg', 445, NOW(), 3),
(16, 'Quando minha mae chama pelo nome completo:', 'Nivel de perigo: EXTREMO', 'https://i.imgflip.com/5gitn.jpg', 389, NOW(), 6),
(17, 'Sexta-feira 17h:', 'Finalmente livre!', 'https://i.imgflip.com/1ur9b0.jpg', 478, NOW(), 1),
(18, 'Eu vendo algo caro: vs Eu vendo algo barato:', 'Stonks invertido', 'https://i.imgflip.com/2nqnlz.jpg', 312, NOW(), 5),
(19, 'Quando dizem que vou ter que falar em publico:', 'Ansiedade nivel 1000', 'https://i.imgflip.com/3oqj4n.jpg', 267, NOW(), 2),
(20, 'WiFi em casa vs WiFi na casa do amigo:', 'Diferenca gritante', 'https://i.imgflip.com/3si5h.jpg', 356, NOW(), 6);

INSERT INTO comentario (id, texto, data_criacao, meme_id, usuario_id) VALUES
(1, 'SIMMMM exatamente isso!! 😂😂', NOW(), 1, 2),
(2, 'Me identifiquei DEMAIS', NOW(), 1, 3),
(3, 'Todo mundo ja passou por isso KKKK', NOW(), 1, 4),
(4, 'A realidade doi mas e verdade', NOW(), 2, 1),
(5, 'Acordo pior que um zumbi', NOW(), 2, 5),
(6, 'EU ODEIO quando fazem isso!', NOW(), 3, 2),
(7, 'Serio mesmo, nao mexe no meu celular 😤', NOW(), 3, 6),
(8, 'Todo professor mente sobre a prova ser facil', NOW(), 4, 3),
(9, 'A prova sempre e mais dificil que o esperado', NOW(), 4, 1),
(10, 'Meu trauma com provas resumido em um meme', NOW(), 4, 5),
(11, 'EU as 4 da manha vendo video no YouTube', NOW(), 5, 4),
(12, 'Nunca consigo dormir cedo, e fato', NOW(), 5, 2),
(13, 'KKKKKKK acontece direto comigo!', NOW(), 6, 1),
(14, 'Bug? Que bug? Ta funcionando deixa quieto', NOW(), 6, 5),
(15, 'A magia negra da programacao e real', NOW(), 6, 4),
(16, 'EXATAMENTE! Mae nao entende de jogo online', NOW(), 7, 3),
(17, 'Ja tentei explicar isso 1000 vezes', NOW(), 7, 6),
(18, 'Odeio segunda-feira com todas as minhas forcas', NOW(), 8, 2),
(19, 'Segunda-feira deveria ser ilegal', NOW(), 8, 1),
(20, 'Por favor inventem remedio pra curar segunda', NOW(), 8, 4),
(21, 'Eu na aula de matematica', NOW(), 9, 5),
(22, 'Finjo que entendo mas nao entendo nada', NOW(), 9, 3),
(23, 'EU CORRO igual Usain Bolt', NOW(), 10, 1),
(24, 'Comida gratis e sagrada', NOW(), 10, 2),
(25, 'Ninguem segura quando tem comida gratis', NOW(), 10, 6),
(26, 'Meu dinheiro sempre some misteriosamente', NOW(), 11, 4),
(27, 'Economizar? Nao conheco', NOW(), 11, 3),
(28, 'Eu: Estou otimo! (Narrador: Ela nao estava)', NOW(), 12, 5),
(29, 'Sempre finjo que ta tudo bem', NOW(), 12, 2),
(30, 'As vezes e melhor mentir que contar a verdade', NOW(), 12, 6),
(31, 'Como eu mudei... pra pior KKKK', NOW(), 13, 1),
(32, 'A vida te transforma mesmo', NOW(), 13, 4),
(33, 'NAOOOOO isso nao pode acontecer', NOW(), 14, 3),
(34, 'Professor adora fazer isso', NOW(), 14, 5),
(35, 'Momento mais tenso da vida escolar', NOW(), 14, 2),
(36, 'Meu cerebro sempre avisa mas eu nunca escuto', NOW(), 15, 6),
(37, 'História da minha vida', NOW(), 15, 1),
(38, 'Faço as piores decisoes mesmo sendo avisado', NOW(), 15, 4),
(39, 'Quando ela usa o nome completo EU SEI que deu ruim', NOW(), 16, 3),
(40, 'Nivel de perigo: VERMELHO ALERTA MAXIMO', NOW(), 16, 5),
(41, 'FINALMENTE ACABOU A SEMANA!!', NOW(), 17, 2),
(42, 'Melhor momento da semana disparado', NOW(), 17, 1),
(43, 'Sexta-feira e o melhor dia sem duvidas', NOW(), 17, 6),
(44, 'Stonks invertido KKKK perco dinheiro sempre', NOW(), 18, 4),
(45, 'Eu sou pessimo vendedor', NOW(), 18, 3),
(46, 'Minha ansiedade social e REAL', NOW(), 19, 1),
(47, 'Prefiro fazer qualquer coisa do que falar em publico', NOW(), 19, 5),
(48, 'WiFi da casa do amigo sempre e melhor', NOW(), 20, 2),
(49, 'Por que o WiFi dos outros funciona melhor?', NOW(), 20, 6),
(50, 'Vou na casa dos amigos so pelo WiFi KKKK', NOW(), 20, 4);

-- Reset das sequences (auto_increment)
ALTER TABLE usuario AUTO_INCREMENT = 7;
ALTER TABLE meme AUTO_INCREMENT = 21;
ALTER TABLE comentario AUTO_INCREMENT = 51;

-- Verificar dados inseridos
SELECT 'Usuarios inseridos:' AS Info;
SELECT COUNT(*) as total FROM usuario;

SELECT 'Memes inseridos:' AS Info;
SELECT COUNT(*) as total FROM meme;

SELECT 'Comentarios inseridos:' AS Info;
SELECT COUNT(*) as total FROM comentario;

SELECT 'Script executado com sucesso!' AS Status;
