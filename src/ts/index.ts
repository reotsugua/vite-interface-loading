import { getRedirectData, fetchWithAuth } from "./service.ts";
import type { RedirectResponse } from "./interface.ts";

const progress = document.querySelector('.progress-bar') as HTMLButtonElement;
const img = document.querySelector('.img-animada') as HTMLImageElement;
const statusMsg = document.getElementById('status') as HTMLButtonElement;

const steps = [
  "Carregando interface...",
  "Conectando ao servidor...",
  "Verificando dados...",
  "Autenticando usuário...",
  "Retornando dados...",
  "Finalizando processo..."
];

let index = 0;

const updateMessage = (msg: string) => {
  statusMsg.classList.remove("visible");
  setTimeout(() => {
    statusMsg.textContent = msg;
    statusMsg.classList.add("visible");
  }, 300);
};


const stepInterval = setInterval(() => {
  updateMessage(steps[index]);
  index = (index + 1) % steps.length;
}, 3000);


setTimeout(async () => {
  clearInterval(stepInterval);
  updateMessage("Enviando requisição...");

  try {

    const redirectData: RedirectResponse = await getRedirectData();
    const result = await fetchWithAuth(redirectData);


    console.log(result);
    updateMessage("Sucesso! Redirecionando...");
    // setTimeout(() => {
    //     // window.location.href = "https://euro17.com.br"; 
    //     window.location.replace("https://euro17.com.br");
    // }, 1500);
  } catch (error) {
    updateMessage("Algo deu errado!");
    console.error(error);
    openModal();
    // errorMsg.textContent = error.message;
  }




}, 4000);


img.addEventListener('animationend', () => {
  img.classList.add('final');

  progress.classList.add('visible');
});


function openModal() {
  const backdrop = document.getElementById('backdrop') as HTMLButtonElement;
  backdrop.classList.add('show');
}










