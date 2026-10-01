function configurarFormularioCadastro() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  const campoNome = document.getElementById('nome');
  const campoEmail = document.getElementById('email');
  const campoCpf = document.getElementById('cpf');

  // Restauração de dados
  const dadosSalvos = localStorage.getItem('dadosCadastroOng');
  if (dadosSalvos) {
    const dadosConvertidos = JSON.parse(dadosSalvos);
    campoNome.value = dadosConvertidos.nome;
    campoEmail.value = dadosConvertidos.email;
    campoCpf.value = dadosConvertidos.cpf;
  }

  // Gravação de dados
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
      mensagemErro.textContent = 'O nome deve conter pelo menos 3 letras.';
      campoNome.insertAdjacentElement('afterend', mensagemErro);
      return; 
    }

    const dadosVoluntario = { nome, email, cpf };
    localStorage.setItem('dadosCadastroOng', JSON.stringify(dadosVoluntario));

    Swal.fire('Sucesso!', 'Cadastro salvo no navegador.', 'success');
  });
}