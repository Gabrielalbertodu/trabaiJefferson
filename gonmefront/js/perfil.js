const API_URL = 'http://localhost:8080/api';
let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual')) || { id: 1, nome: 'Usuário Padrão' };
const USUARIO_ID = usuarioAtual.id;

async function carregarPerfil() {
    try {
        const resposta = await fetch(`${API_URL}/usuario/${USUARIO_ID}`);
        
        if (resposta.ok) {
            const usuario = await resposta.json();
            localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
            usuarioAtual = usuario;
            
            document.getElementById('nomeUsuario').textContent = usuario.nome || 'Usuário';
            document.getElementById('emailUsuario').textContent = usuario.email || 'usuario@email.com';
            document.getElementById('biografia').textContent = usuario.biografia || 'Sem biografia';
            
            if (usuario.fotoPerfil) {
                document.getElementById('fotoPerfil').src = usuario.fotoPerfil;
            }
        } else {
            console.warn('Usuário não encontrado, usando padrão');
        }
    } catch (erro) {
        console.error('Erro ao carregar perfil:', erro);
    }
}

async function carregarMeusMemes() {
    const meusMemes = document.getElementById('meusMemes');
    meusMemes.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Carregando...</span></div></div>';
    
    try {
        const resposta = await fetch(`${API_URL}/meme`);
        
        if (resposta.ok) {
            const todosMemes = await resposta.json();
            const memesFiltrados = todosMemes.filter(meme => meme.usuario && meme.usuario.id === USUARIO_ID);
            
            meusMemes.innerHTML = '';
            
            if (memesFiltrados.length === 0) {
                meusMemes.innerHTML = '<div class="col-12 text-center"><p>Você ainda não postou nenhum meme</p></div>';
                return;
            }
            
            memesFiltrados.forEach(meme => {
                const cardMeme = criarCardMeme(meme);
                meusMemes.innerHTML += cardMeme;
            });
        }
    } catch (erro) {
        console.error('Erro:', erro);
        meusMemes.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Erro ao carregar memes</p></div>';
    }
}

function criarCardMeme(meme) {
    return `
        <div class="col-md-6">
            <div class="card-meme">
                <img src="${meme.imagemUrl}" alt="${meme.titulo}" onerror="this.src='https://via.placeholder.com/400x300?text=Imagem+Indisponível'">
                <div class="card-meme-body">
                    <h5 class="card-meme-title">${meme.titulo}</h5>
                    <div class="votos mb-2">
                        <span class="contador-votos">${meme.votos || 0} votos</span>
                    </div>
                    <button class="btn btn-sm btn-danger w-100" onclick="deletarMeme(${meme.id})">
                        🗑️ Deletar
                    </button>
                </div>
            </div>
        </div>
    `;
}

async function deletarMeme(memeId) {
    if (!confirm('Tem certeza que deseja deletar este meme?')) {
        return;
    }
    
    try {
        const resposta = await fetch(`${API_URL}/meme/${memeId}`, {
            method: 'DELETE'
        });
        
        if (resposta.ok) {
            alert('Meme deletado com sucesso!');
            carregarMeusMemes();
        } else {
            alert('Erro ao deletar meme');
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao deletar meme');
    }
}

function editarPerfil() {
    const modalHTML = `
        <div class="modal fade" id="modalEditarPerfil" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal-meme">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Perfil</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formEditarPerfil" onsubmit="salvarPerfil(event)">
                            <div class="mb-3">
                                <label class="form-label">Nome</label>
                                <input type="text" class="form-control" id="editNome" 
                                       value="${usuarioAtual.nome || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" id="editEmail" 
                                       value="${usuarioAtual.email || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Biografia</label>
                                <textarea class="form-control" id="editBiografia" rows="3">${usuarioAtual.biografia || ''}</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">URL da Foto de Perfil</label>
                                <input type="url" class="form-control" id="editFotoPerfil" 
                                       value="${usuarioAtual.fotoPerfil || ''}" placeholder="https://exemplo.com/foto.jpg">
                                <small class="text-muted">Deixe em branco para usar a foto padrão</small>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    let modalExistente = document.getElementById('modalEditarPerfil');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('modalEditarPerfil'));
    modal.show();
    
    document.getElementById('modalEditarPerfil').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

async function salvarPerfil(event) {
    event.preventDefault();
    
    const usuarioAtualizado = {
        id: USUARIO_ID,
        nome: document.getElementById('editNome').value,
        email: document.getElementById('editEmail').value,
        biografia: document.getElementById('editBiografia').value,
        fotoPerfil: document.getElementById('editFotoPerfil').value || null,
        senha: usuarioAtual.senha || 'senha123'
    };
    
    try {
        const resposta = await fetch(`${API_URL}/usuario/${USUARIO_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioAtualizado)
        });
        
        if (resposta.ok) {
            alert('Perfil atualizado com sucesso!');
            bootstrap.Modal.getInstance(document.getElementById('modalEditarPerfil')).hide();
            await carregarPerfil();
        } else {
            alert('Erro ao atualizar perfil');
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao atualizar perfil');
    }
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
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarBotaoAuth();
    carregarPerfil();
    carregarMeusMemes();
});
