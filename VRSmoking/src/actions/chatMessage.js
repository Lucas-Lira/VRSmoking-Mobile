export const carregaMensagens = (usuario_origem, grupo_usuario_origem, cod_desnito, tipo_destino) => { // Exportando dessa forma é possível exportar mais de uma action create
    return {
        type: 'carrega-mensagens',
        usuario_origem,
        grupo_usuario_origem,
        cod_desnito,
        tipo_destino 
    }
};