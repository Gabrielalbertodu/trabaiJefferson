const API_URL = 'http://localhost:8080/api';
let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual')) || { id: 1, nome: 'Usuário Padrão' };
let imagemValida = false;

document.getElementById('urlImagem').addEventListener('input', function() {
    const url = this.value.trim();
    const preview = document.getElementById('preview');
    
    if (url) {
        preview.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Carregando...</span></div>';
        validarImagem(url);
    } else {
        preview.innerHTML = '<p class="text-muted">A imagem aparecerá aqui</p>';
        imagemValida = false;
    }
});

function validarImagem(url) {
    const preview = document.getElementById('preview');
    const img = new Image();
    
    img.onload = function() {
        if (this.width > 0 && this.height > 0) {
            preview.innerHTML = `
                <img src="${url}" alt="Preview">
                <div class="mt-2">
                    <small class="text-success">✓ Imagem válida (${this.width}x${this.height})</small>
                </div>
            `;
            imagemValida = true;
        }
    };
    
    img.onerror = function() {
        preview.innerHTML = `
            <div class="text-danger">
                <p>❌ Não foi possível carregar a imagem</p>
                <small>Verifique se a URL está correta e acessível</small>
            </div>
        `;
        imagemValida = false;
    };
    
    img.src = url;
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
});

document.getElementById('formUpload').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value.trim();
    const urlImagem = document.getElementById('urlImagem').value.trim();
    
    if (!titulo || titulo.length < 3) {
        alert('O título deve ter pelo menos 3 caracteres');
        return;
    }
    
    if (!urlImagem) {
        alert('Por favor, insira a URL da imagem');
        return;
    }
    
    if (!imagemValida) {
        alert('Aguarde a validação da imagem ou insira uma URL válida');
        return;
    }
    
    const btnSubmit = this.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Postando...';
    
    const meme = {
        titulo: titulo,
        imagemUrl: urlImagem,
        usuario: {
            id: usuarioAtual.id
        }
    };
    
    try {
        const resposta = await fetch(`${API_URL}/meme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meme)
        });
        
        if (resposta.ok) {
            const memePostado = await resposta.json();
            alert('Meme postado com sucesso!');
            window.location.href = 'index.html';
        } else {
            const erro = await resposta.text();
            alert('Erro ao postar meme: ' + erro);
            btnSubmit.disabled = false;
            btnSubmit.textContent = textoOriginal;
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
        btnSubmit.disabled = false;
        btnSubmit.textContent = textoOriginal;
    }
});
