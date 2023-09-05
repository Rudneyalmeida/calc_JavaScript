const main = document.querySelector("main");   // pega o elemento com a classe main
const root = document.querySelector(":root");   // pega o elemento root
const input = document.getElementById("input"); // input da calculadora
const resultInput = document.getElementById("result"); // input do resultado

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "] // teclas permitidas

document.querySelectorAll('.charKey').forEach(function (charKeyBtn) { // para cada botão com a classe charKey
  charKeyBtn.addEventListener('click', function () { // adiciona um evento de click
    const value = charKeyBtn.dataset.value; // pega o valor do atributo data-value
    input.value += value; // adiciona o valor do atributo data-value ao input
  });
});

document.getElementById("clear").addEventListener("click", function () { // limpa o input
  input.value = ""; // limpa o input
  input.focus(); // foca no input
});

input.addEventListener("keydown", function (e) { // adiciona um evento de keydown ao input
  e.preventDefault();
  if (allowedKeys.includes(e.key)) { // se a tecla pressionada estiver no array allowedKeys
    input.value += e.key;  // adiciona o valor da tecla pressionada ao input
    return;
  }
  if (e.key === "Backspace") { // se a tecla pressionada for backspace
    input.value = input.value.slice(0, -1); // remove o ultimo caractere do input
    return;
  }
  if (e.key === "Enter"){
    calculate();
  }
});

document.getElementById('equal').addEventListener('click', calculate); // adiciona um evento de click ao botão de igual

function calculate() {
  resultInput.value = 'ERROR';  // adiciona o valor de error ao input de resultado
  resultInput.classList.add('error');
  const result = eval(input.value); // calcula o valor do input
  resultInput.value = result; // adiciona o valor do input ao input de resultado
  resultInput.classList.remove('error');    // remove a classe error do input de resultado

}

document.getElementById('copyToClipboard').addEventListener('click', function (e) { // adiciona um evento de click ao botão de copiar
  const button = e.currentTarget; // pega o botão que foi clicado
  if (button.innerText === 'Copy'){ // se o texto do botão for copy
    button.innerText = 'Copied!'; // muda o texto do botão para copied
    button.classList.add('success'); // adiciona a classe success ao botão
    navigator.clipboard.writeText(resultInput.value); // copia o valor do input de resultado
  } else{
    button.innerText = 'Copy'; // muda o texto do botão para copy
    button.classList.remove('success'); // remove a classe success do botão
  }
});


document.getElementById('themeSwitcher').addEventListener('click', function () {
  if (main.dataset.theme === 'dark') { // se o tema for dark
    root.style.setProperty('--bg-color', '#f1f5f9'); // muda a cor de fundo
    root.style.setProperty('--border-color', '#aaa');
    root.style.setProperty('--font-color', '#212529');
    root.style.setProperty('--primary-color', '#26834a');
    main.dataset.theme = 'light'; // muda o tema para light
  } else { // se o tema for light
    root.style.setProperty('--bg-color', '#212529'); // muda a cor de fundo
    root.style.setProperty('--border-color', '#666');
    root.style.setProperty('--font-color', '#f1f5f9');
    root.style.setProperty('--primary-color', '#4dff91');
    main.dataset.theme = 'dark'; // muda o tema para dark
  }
});
