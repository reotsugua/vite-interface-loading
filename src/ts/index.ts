const progress = document.querySelector('.progress-bar') as HTMLButtonElement;
const img = document.querySelector('.img-animada') as HTMLImageElement;
const statusMsg = document.getElementById('status') as HTMLButtonElement;
// const errorMsg = document.getElementById('error') as HTMLButtonElement;

const steps = [
    "Carregando interface...",
    "Conectando ao servidor...",
    "Verificando dados...",
    "Autenticando usuário...",
    "Retornando dados...",
    "Finalizando processo..."
];

let index = 0;

const updateMessage = (msg: any) => {
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


setTimeout(() => {
    clearInterval(stepInterval);
    updateMessage("Enviando requisição...");

    fetchRedirect()

    // fetch("https://jsonplaceholder.typicode.com/posts/1000000")
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error(`Erro ${response.status}: ${response.statusText}`);
    //         }
    //         return response.json();
    //     })
    //     .then(() => {
    //         updateMessage("Sucesso! Redirecionando...");
    //         setTimeout(() => {
    //             // window.location.href = "https://euro17.com.br"; 
    //             window.location.replace("https://euro17.com.br");
    //         }, 1500);
    //     })
    //     .catch(error => {
    //         updateMessage("Algo deu errado!");
    //         console.error(error);
    //         openModal();
    //         // errorMsg.textContent = error.message;
    //     });

}, 900);


img.addEventListener('animationend', () => {
    img.classList.add('final');

    progress.classList.add('visible');    
});



function openModal() {
    const backdrop =  document.getElementById('backdrop') as HTMLButtonElement;
    backdrop.classList.add('show');
}







interface RedirectResponse {
  redirectUrl: string
  token: string
}

async function fetchRedirect(): Promise<void> {
  console.log('fetchRedirect chamado')
  try {
    const response = await fetch('api/v1/Redirector/redirect', {
      method: 'GET',
      headers: {
        'x-api-key': 'X'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    const data: RedirectResponse = await response.json()
    console.log('Resposta:', data)

  } catch (error) {
    console.error('Erro:', error)
  }
}

