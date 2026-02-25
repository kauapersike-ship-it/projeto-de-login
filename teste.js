const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://djwclyuyctftavgdmdyp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DUl78ptuo5EBHfOL6pdWKA_fLvdZf37';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testar() {
    console.log('🔄 Testando conexão...');
    
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) {
        console.log('❌ Erro:', error.message);
    } else {
        console.log('✅ Sucesso! Dados encontrados:', data);
    }
}

testar();
