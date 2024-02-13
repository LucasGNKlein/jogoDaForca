// Lista de palavras
const palavras = ["javascript", "html", "css", "python", "java", "ruby", "typescript", "php", "react", "angular", "vue"];

// Escolher uma palavra aleatória
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];

let palavraAtual = Array(palavraSecreta.length).fill('_');
let tentativasRestantes = 6; // Defina o número de vidas aqui
let letrasErradas = [];

function exibirPalavra() {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = palavraAtual.join(' ');
}

function atualizarTentativas() {
    document.getElementById('remaining').innerText = tentativasRestantes;
}

function decrementarVida() {
    const heartContainer = document.getElementById('heart-container');
    heartContainer.innerHTML = ''; // Limpa os corações antes de adicionar novos
    for (let i = 0; i < tentativasRestantes; i++) {
        const heart = document.createElement('div');
        heart.className = 'pixelized--heart';
        heartContainer.appendChild(heart);
    }
}

function verificarLetra(letra) {
    if (palavraSecreta.includes(letra)) {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
                palavraAtual[i] = letra;
            }
        }
    } else {
        letrasErradas.push(letra);
        tentativasRestantes--;
        decrementarVida();
    }
}

function verificarVitoria() {
    if (!palavraAtual.includes('_')) {
        document.getElementById('message').innerText = 'Parabéns! Você venceu!';
        desabilitarEntrada();
    }
}

function verificarDerrota() {
    if (tentativasRestantes === 0) {
        document.getElementById('message').innerText = 'Você perdeu! A palavra era: ' + palavraSecreta;
        desabilitarEntrada();
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  // Limpar corações
  const heartContainer = document.getElementById('heart-container');
  heartContainer.innerHTML = '';

  // Escolher uma nova palavra aleatória
  const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];

  palavraAtual = Array(palavraSecreta.length).fill('_');
  tentativasRestantes = 6;
  letrasErradas = [];

  // Limpar mensagem de vitória/derrota
  document.getElementById('message').innerText = '';

  // Habilitar entrada
  document.getElementById('guessInput').disabled = false;
  document.getElementById('guessButton').disabled = false;

  // Exibir nova palavra e reiniciar tentativas
  exibirPalavra();
  atualizarTentativas();
}

// Função para verificar se o jogo foi ganho ou perdido e pedir para reiniciar
function verificarFimJogo() {
  if (!palavraAtual.includes('_')) {
      const continuar = confirm('Parabéns! Você venceu! Deseja jogar novamente?');
      if (continuar) {
          reiniciarJogo();
      } else {
          desabilitarEntrada();
      }
  } else if (tentativasRestantes === 0) {
      const continuar = confirm('Você perdeu! A palavra era: ' + palavraSecreta + '\nDeseja jogar novamente?');
      if (continuar) {
          reiniciarJogo();
      } else {
          desabilitarEntrada();
      }
  }
}


function guess() {
    const input = document.getElementById('guessInput');
    const tentativa = input.value.toLowerCase();

    if (tentativa.length === 1 && tentativa.match(/[a-z]/i)) {
        if (!palavraAtual.includes(tentativa) && !letrasErradas.includes(tentativa)) {
            verificarLetra(tentativa);
            exibirPalavra();
            atualizarTentativas();
            verificarVitoria();
            verificarDerrota();
        } else {
            document.getElementById('message').innerText = 'Você já tentou essa letra. Tente outra.';
        }
    } else if (tentativa.length > 1 && tentativa.match(/[a-z]/i)) {
        if (tentativa === palavraSecreta) {
            palavraAtual = tentativa.split('');
            exibirPalavra();
            document.getElementById('message').innerText = 'Parabéns! Você venceu!';
            desabilitarEntrada();
        } else {
            letrasErradas.push(tentativa);
            tentativasRestantes--;
            atualizarTentativas();
            decrementarVida();
            verificarDerrota();
        }
    } else {
        document.getElementById('message').innerText = 'Por favor, digite uma única letra ou palavra válida.';
    }

    input.value = '';

    verificarFimJogo();
}

function desabilitarEntrada() {
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessButton').disabled = true;
}

// Inicializar o jogo
exibirPalavra();
atualizarTentativas();
decrementarVida(); // Adicionar corações iniciais
