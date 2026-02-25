const SUPABASE_URL = 'https://djwclyuyctftavgdmdyp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DUl78ptuo5EBHfOL6pdWKA_fLvdZf37';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('✅ Supabase iniciado com sucesso!');

// Testar conexão com banco de dados
async function testarConexao() {
    console.log('🔍 Testando conexão com Supabase...');
    try {
        const { data, error } = await supabaseClient
            .from('usuarios')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Erro ao conectar:', error.message);
            alert(`Erro na conexão: ${error.message}`);
            return;
        }

        console.log('✅ Conexão bem-sucedida!');
        console.log(`📊 Usuários encontrados: ${data.length}`);
        alert(`✅ Banco conectado!\nTotal de usuários: ${data.length}`);
    } catch (err) {
        console.error('❌ Erro:', err);
        alert(`Erro: ${err.message}`);
    }
}

// Testar quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Não testar conexão automaticamente ao carregar — usar o botão manual
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', fazerLogin);
    }

    const btnTestConnection = document.getElementById('btnTestConnection');
    if (btnTestConnection) {
        btnTestConnection.addEventListener('click', testarConexao);
    }

    const btnProximo = document.getElementById('btnProximo');
    if (btnProximo) {
        btnProximo.addEventListener('click', irParaPlanos);
    }
});

// Login
async function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    if (!email || !senha) {
        alert('Por favor, preencha email e senha');
        return;
    }

    const { data, error } = await supabaseClient
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .eq('senha', senha);

    if (error || data.length === 0) {
        alert('Usuário ou senha incorretos');
        return;
    }

    alert('Login realizado com sucesso!');
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
}

// Registrar
async function irParaPlanos() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email-reg').value;
    const senha = document.getElementById('senha-reg').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Validações
    if (!username || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não correspondem');
        return;
    }

    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres');
        return;
    }

    // Armazena dados temporariamente na sessionStorage
    const registroData = {
        username: username,
        email: email,
        senha: senha
    };
    sessionStorage.setItem('registroData', JSON.stringify(registroData));
    
    alert('Dados validados! Escolha seu plano.');
    window.location.href = './plan.html';
}

// Registrar
async function fazerRegistro(email, usuario, senha) {
    try {
        const { data, error } = await supabaseClient
            .from('usuarios')
            .insert([{ email, username: usuario, senha }]);

        if (error) {
            const msg = (error.message || '').toLowerCase();
            if (msg.includes('duplicate') || msg.includes('usuarios_email_key') || msg.includes('duplicate key')) {
                alert('Erro: esse email já está cadastrado. Faça login ou recupere sua senha.');
                return;
            }

            alert('Erro ao registrar: ' + error.message);
            return;
        }

        alert('Cadastro realizado!');
    } catch (err) {
        console.error('Erro ao registrar:', err);
        alert('Erro inesperado: ' + (err.message || err));
    }
}

// Finalizar cadastro com plano
async function finalizarCadastroComPlano(plano) {
    const registroData = JSON.parse(sessionStorage.getItem('registroData'));
    
    if (!registroData) {
        alert('Erro: dados do registro não encontrados');
        return;
    }

    // Tenta registrar o usuário no banco com o plano
    try {
        const { data, error } = await supabaseClient
            .from('usuarios')
            .insert([{ 
                email: registroData.email, 
                username: registroData.username, 
                senha: registroData.senha,
                plano: plano
            }]);

        if (error) {
            // Tratar email duplicado primeiro
            const msg = (error.message || '').toLowerCase();
            if (msg.includes('duplicate') || msg.includes('usuarios_email_key') || msg.includes('duplicate key')) {
                alert('Erro: esse email já está cadastrado. Faça login ou recupere sua senha.');
                return;
            }

            // Se o erro indicar que a coluna 'plano' não existe, tenta inserir sem o campo
            if (msg.includes("could not find the 'plano' column") || msg.includes("column \"plano\"") || msg.includes("column 'plano'")) {
                console.warn("Coluna 'plano' não encontrada — tentando inserir sem 'plano'.");
                const { data: data2, error: error2 } = await supabaseClient
                    .from('usuarios')
                    .insert([{ 
                        email: registroData.email, 
                        username: registroData.username, 
                        senha: registroData.senha
                    }]);

                if (error2) {
                    // Verificar duplicidade também no segundo intento
                    const m2 = (error2.message || '').toLowerCase();
                    if (m2.includes('duplicate') || m2.includes('usuarios_email_key') || m2.includes('duplicate key')) {
                        alert('Erro: esse email já está cadastrado. Faça login ou recupere sua senha.');
                        return;
                    }

                    alert('Erro ao registrar: ' + error2.message);
                    return;
                }

                alert(`Cadastro realizado com sucesso!\n(Plano não salvo — coluna ausente)`);
                sessionStorage.removeItem('registroData');
                window.location.href = './login.html';
                return;
            }

            alert('Erro ao registrar: ' + error.message);
            return;
        }

        alert(`Cadastro realizado com sucesso!\nPlano: ${plano.toUpperCase()}`);
        sessionStorage.removeItem('registroData');
        window.location.href = './login.html';
    } catch (err) {
        console.error('Erro ao finalizar cadastro:', err);
        alert('Erro inesperado: ' + (err.message || err));
    }
}
