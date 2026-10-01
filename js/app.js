const areaPrincipal = document.getElementById('app');

async function abrirPagina(evento, nomeDoArquivo) {
  evento.preventDefault(); 

  try {
    const resposta = await fetch('html/' + nomeDoArquivo);
    
    if (!resposta.ok) {
      throw new Error('Página não encontrada');
    }

    const conteudo = await resposta.text();
    areaPrincipal.innerHTML = conteudo;
    
    // VERIFICAÇÃO CRÍTICA DA SPA: 
    // Se a página carregada for a de cadastro, ativa a lógica do formulário
    if (nomeDoArquivo === 'cadastro.html') {
      configurarFormularioCadastro();
    }
    
  } catch (erro) {
    areaPrincipal.innerHTML = '<h2>Erro ao carregar a página.</h2><p>Conteúdo indisponível no momento.</p>';
    console.error('Erro na requisição SPA:', erro);
  }
}

// Função para capturar, validar e salvar os dados
function configurarFormularioCadastro() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  const campoNome = document.getElementById('nome');
  const campoEmail = document.getElementById('email');
  const campoCpf = document.getElementById('cpf');

  // --- RESTAURAÇÃO DE DADOS (GET e PARSE) ---
  const dadosSalvos = localStorage.getItem('dadosCadastroOng');
  if (dadosSalvos) {
    // Converte a string de volta para objeto
    const dadosConvertidos = JSON.parse(dadosSalvos);
    
    // Restaura a interface preenchendo os campos
    campoNome.value = dadosConvertidos.nome;
    campoEmail.value = dadosConvertidos.email;
    campoCpf.value = dadosConvertidos.cpf;
  }

  // --- GRAVAÇÃO DE DADOS (SET e STRINGIFY) ---
  form.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const cpf = campoCpf.value.trim();

    const erroAntigo = document.getElementById('erro-nome');
    if (erroAntigo) erroAntigo.remove();
    campoNome.style.borderColor = ''; 

    if (nome.length < 3) {
      campoNome.style.borderColor = 'red';
      const mensagemErro = document.createElement('p');
      mensagemErro.id = 'erro-nome';
      mensagemErro.style.color = 'red';
      mensagemErro.style.fontSize = '12px';
      mensagemErro.textContent = 'O nome deve conter pelo menos 3 letras.';
      campoNome.insertAdjacentElement('afterend', mensagemErro);
      return; 
    }

    const dadosVoluntario = { nome, email, cpf };
    // Converte o objeto para string e salva
    localStorage.setItem('dadosCadastroOng', JSON.stringify(dadosVoluntario));

    // alert('Cadastro salvo! Quando você fechar e abrir essa página, os dados ainda estarão aqui.');
    Swal.fire(
      'Sucesso!',
      'Cadastro salvo! Seus dados ficarão guardados no navegador.',
      'success'
    );
  });
}