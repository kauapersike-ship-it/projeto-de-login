// Função para escolher plano (movera do inline para arquivo externo)
function escolherPlano(plano) {
    const registroData = JSON.parse(sessionStorage.getItem('registroData'));

    if (registroData) {
        alert(`Plano ${plano.toUpperCase()} escolhido! Finalizando cadastro...`);
        if (typeof finalizarCadastroComPlano === 'function') {
            finalizarCadastroComPlano(plano);
        } else {
            console.error('finalizarCadastroComPlano não está disponível');
            // Redireciona para login como fallback
            window.location.href = './login.html';
        }
    } else {
        alert('Erro: dados do registro não encontrados');
        window.location.href = './register.html';
    }
}

// Export global para compatibilidade com chamadas via onclick
window.escolherPlano = escolherPlano;
