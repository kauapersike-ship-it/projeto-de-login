function escolherPlano(plano) {
    const registroData = JSON.parse(sessionStorage.getItem('registroData'));

    if (registroData) {
        alert(`Plano ${plano.toUpperCase()} escolhido! Finalizando cadastro...`);
        if (typeof finalizarCadastroComPlano === 'function') {
            finalizarCadastroComPlano(plano);
        } else {
            window.location.href = './login.html';
        }
    } else {
        alert('Erro: dados do registro não encontrados');
        window.location.href = './register.html';
    }
}

window.escolherPlano = escolherPlano;
