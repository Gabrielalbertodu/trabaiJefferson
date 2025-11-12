const API_URL = 'http://localhost:8080/api';
let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual')) || { id: 1, nome: 'Usuário Padrão' };
let filtroAtual = 'recentes';

async function carregarMemes(tipo = 'recentes') {
    filtroAtual = tipo;
    const feedMemes = document.getElementById('feedMemes');
    feedMemes.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Carregando...</span></div></div>';
    
    try {
        const endpoint = tipo === 'populares' ? '/meme/populares' : '/meme';
        const resposta = await fetch(`${API_URL}${endpoint}`);
        
        if (!resposta.ok) {
            throw new Error('Erro ao carregar memes');
        }
        
        const memes = await resposta.json();
        feedMemes.innerHTML = '';
        
        if (memes.length === 0) {
            feedMemes.innerHTML = '<div class="col-12 text-center"><p>Nenhum meme encontrado. Seja o primeiro a postar!</p></div>';
            return;
        }
        
        memes.forEach(meme => {
            const cardMeme = criarCardMeme(meme);
            feedMemes.innerHTML += cardMeme;
        });
        
        document.querySelectorAll('.btn-filtro').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.btn-filtro').forEach(btn => {
            if ((tipo === 'populares' && btn.textContent === 'Populares') || 
                (tipo === 'recentes' && btn.textContent === 'Recentes')) {
                btn.classList.add('active');
            }
        });
        
    } catch (erro) {
        console.error('Erro:', erro);
        feedMemes.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Erro ao carregar memes. Verifique se o servidor está rodando.</p></div>';
    }
}

function criarCardMeme(meme) {
    const nomeUsuario = meme.usuario ? meme.usuario.nome : 'Anônimo';
    return `
        <div class="col-md-4">
            <div class="card-meme" onclick="abrirDetalhes(${meme.id})">
                <img src="${meme.imagemUrl}" alt="${meme.titulo}" onerror="this.src='https://via.placeholder.com/400x300?text=Imagem+Indisponível'">
                <div class="card-meme-body">
                    <h5 class="card-meme-title">${meme.titulo}</h5>
                    <p class="text-muted small mb-2">Por: ${nomeUsuario}</p>
                    <div class="votos">
                        <button class="btn-voto" onclick="event.stopPropagation(); votar(${meme.id}, 1)" title="Upvote">↑</button>
                        <span class="contador-votos">${meme.votos || 0}</span>
                        <button class="btn-voto" onclick="event.stopPropagation(); votar(${meme.id}, -1)" title="Downvote">↓</button>
                    </div>
                    <button class="btn btn-sm btn-outline-light mt-2 w-100" onclick="event.stopPropagation(); abrirDetalhes(${meme.id})">
                        💬 Ver comentários
                    </button>
                </div>
            </div>
        </div>
    `;
}

async function votar(memeId, valor) {
    try {
        const resposta = await fetch(`${API_URL}/meme/${memeId}/votar?valor=${valor}`, {
            method: 'POST'
        });
        
        if (resposta.ok) {
            await carregarMemes(filtroAtual);
        } else {
            alert('Erro ao votar. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro ao votar:', erro);
        alert('Erro ao votar. Verifique sua conexão.');
    }
}

async function abrirDetalhes(memeId) {
    try {
        const resposta = await fetch(`${API_URL}/meme/${memeId}`);
        if (!resposta.ok) throw new Error('Erro ao carregar meme');
        
        const meme = await resposta.json();
        
        const respostaComentarios = await fetch(`${API_URL}/comentario/meme/${memeId}`);
        const comentarios = respostaComentarios.ok ? await respostaComentarios.json() : [];
        
        mostrarModal(meme, comentarios);
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao carregar detalhes do meme');
    }
}

function mostrarModal(meme, comentarios) {
    const nomeUsuario = meme.usuario ? meme.usuario.nome : 'Anônimo';
    const listaComentarios = comentarios.map(c => `
        <div class="comentario-item">
            <strong>${c.usuario ? c.usuario.nome : 'Anônimo'}</strong>
            <p>${c.texto}</p>
            <small class="text-muted">${formatarData(c.dataCriacao)}</small>
        </div>
    `).join('');
    
    const modalHTML = `
        <div class="modal fade" id="modalDetalhes" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content modal-meme">
                    <div class="modal-header">
                        <h5 class="modal-title">${meme.titulo}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-7">
                                <img src="${meme.imagemUrl}" class="img-fluid rounded" alt="${meme.titulo}">
                                <div class="mt-3">
                                    <small class="text-muted">Postado por: ${nomeUsuario}</small>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="votos mb-3 justify-content-center">
                                    <button class="btn-voto" onclick="votarNoModal(${meme.id}, 1)">↑</button>
                                    <span class="contador-votos">${meme.votos || 0}</span>
                                    <button class="btn-voto" onclick="votarNoModal(${meme.id}, -1)">↓</button>
                                </div>
                                
                                <h6 class="mb-3">Comentários (${comentarios.length})</h6>
                                <div class="comentarios-lista" id="listaComentarios">
                                    ${comentarios.length > 0 ? listaComentarios : '<p class="text-muted">Nenhum comentário ainda. Seja o primeiro!</p>'}
                                </div>
                                
                                <form id="formComentario" class="mt-3" onsubmit="enviarComentario(event, ${meme.id})">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="textoComentario" 
                                               placeholder="Adicione um comentário..." required>
                                        <button class="btn btn-primary" type="submit">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    let modalExistente = document.getElementById('modalDetalhes');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('modalDetalhes'));
    modal.show();
    
    document.getElementById('modalDetalhes').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

async function votarNoModal(memeId, valor) {
    await votar(memeId, valor);
    setTimeout(() => abrirDetalhes(memeId), 500);
}

async function enviarComentario(event, memeId) {
    event.preventDefault();
    
    const texto = document.getElementById('textoComentario').value.trim();
    if (!texto) return;
    
    const comentario = {
        texto: texto,
        meme: { id: memeId },
        usuario: { id: usuarioAtual.id }
    };
    
    try {
        const resposta = await fetch(`${API_URL}/comentario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comentario)
        });
        
        if (resposta.ok) {
            document.getElementById('textoComentario').value = '';
            await abrirDetalhes(memeId);
        } else {
            alert('Erro ao enviar comentário');
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao enviar comentário');
    }
}

function formatarData(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    const agora = new Date();
    const diff = Math.floor((agora - data) / 1000);
    
    if (diff < 60) return 'agora mesmo';
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d atrás`;
    
    return data.toLocaleDateString('pt-BR');
}

function atualizarBotaoAuth() {
    const btnAuth = document.getElementById('btnAuth');
    if (btnAuth) {
        if (usuarioAtual && usuarioAtual.id) {
            btnAuth.textContent = 'Logout';
            btnAuth.onclick = (e) => {
                e.preventDefault();
                if (confirm('Deseja realmente sair?')) {
                    localStorage.removeItem('usuarioAtual');
                    window.location.href = 'login.html';
                }
            };
        } else {
            btnAuth.textContent = 'Login';
            btnAuth.href = 'login.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarBotaoAuth();
    carregarMemes();
});
