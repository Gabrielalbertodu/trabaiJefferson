const API_URL = 'http://localhost:8080/api';

if (localStorage.getItem('usuarioAtual')) {
    const usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    if (usuario && usuario.id) {
        window.location.href = 'index.html';
    }
}

document.getElementById('formLogin').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    try {
        const resposta = await fetch(`${API_URL}/usuario/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        
        if (resposta.ok) {
            const usuario = await resposta.json();
            if (usuario) {
                localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
                alert('Login realizado com sucesso!');
                window.location.href = 'index.html';
            } else {
                alert('Email ou senha incorretos');
            }
        } else {
            alert('Erro ao fazer login');
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao conectar com o servidor');
    }
});

document.getElementById('formRegistro').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('registroNome').value.trim();
    const email = document.getElementById('registroEmail').value.trim();
    const senha = document.getElementById('registroSenha').value;
    const confirmarSenha = document.getElementById('registroConfirmarSenha').value;
    
    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
    }
    
    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres');
        return;
    }
    
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha,
        biografia: 'Novo membro do GONME!',
        fotoPerfil: null
    };
    
    try {
        const resposta = await fetch(`${API_URL}/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        });
        
        if (resposta.ok) {
            const usuarioCriado = await resposta.json();
            localStorage.setItem('usuarioAtual', JSON.stringify(usuarioCriado));
            alert('Conta criada com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Erro ao criar conta');
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao conectar com o servidor');
    }
});
