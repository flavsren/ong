const areaPrincipal = document.getElementById('app');

async function abrirPagina(evento, nomeDoArquivo) {
  evento.preventDefault(); 

  try {
    const resposta = await fetch('html/' + nomeDoArquivo);
    if (!resposta.ok) throw new Error('Página não encontrada');

    const conteudo = await resposta.text();
    areaPrincipal.innerHTML = conteudo;
    
    // Comunicação limpa com o outro módulo:
    if (nomeDoArquivo === 'cadastro.html') {
      configurarFormularioCadastro();
    }
    
  } catch (erro) {
    areaPrincipal.innerHTML = '<h2>Erro ao carregar.</h2><p>Conteúdo indisponível.</p>';
  }
}
document.getElementById('link-projetos').addEventListener('click', function(event) {
  abrirPagina(event, 'projetos.html');
});

document.getElementById('link-cadastro').addEventListener('click', function(event) {
  abrirPagina(event, 'cadastro.html');
});
