import { getRedirectData, fetchWithAuth } from "./service.ts";
import type { RedirectResponse } from "./interface.ts";

const progress = document.querySelector('.progress-bar') as HTMLElement;
const img = document.querySelector('.img-animada') as HTMLImageElement;
const statusMsg = document.getElementById('status') as HTMLElement;
const steps: Array<string> = [
  "Verificando dados...",
  "Aguarde um momento...",
  "Carregando...",
  "Retornando dados...",
  "Finalizando processo..."
];
let index: number = 0;

const updateMessage = (msg: string): void => {
  statusMsg.classList.remove("visible");
  setTimeout(() => {
    statusMsg.textContent = msg;
    statusMsg.classList.add("visible");
  }, 300);
};

const stepInterval: number = setInterval(() => {
  updateMessage(steps[index]);
  index = (index + 1) % steps.length;
}, 3000);

function openModal(): void {
  const backdrop = document.getElementById('backdrop') as HTMLButtonElement;
  backdrop.classList.add('show');
}

const sendRedirectRequest = async (): Promise<void> => {
  steps[index] = "Enviando requisição..."
  
  try {
    
    const redirectData: RedirectResponse = await getRedirectData();
    const result = await fetchWithAuth(redirectData);
    console.log(result);

    clearInterval(stepInterval);
    updateMessage("Sucesso! Redirecionando...");
    window.location.replace("https://euro17.com.br");
    // setTimeout(() => {
      //     // window.location.href = "https://euro17.com.br"; 
      // }, 1500);
    } catch (error) {
    clearInterval(stepInterval);
    updateMessage("Algo deu errado!");
    console.error(error);
    openModal();
  }
}


img.addEventListener('animationend', (): void => {
  updateMessage("Conectando ao servidor...");
  img.classList.add('final');
  progress.classList.add('visible');
  sendRedirectRequest();
});













