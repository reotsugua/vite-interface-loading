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

    fetch("https://jsonplaceholder.typicode.com/posts/100000")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(() => {
            updateMessage("Sucesso! Redirecionando...");
            setTimeout(() => {
                // window.location.href = "https://euro17.com.br"; 
                window.location.replace("https://euro17.com.br");
            }, 1500);
        })
        .catch(error => {
            updateMessage("Algo deu errado!");
            console.error(error);
            // errorMsg.textContent = error.message;
        });

}, 9000);


img.addEventListener('animationend', () => {
    img.classList.add('final');

    progress.classList.add('visible');    
});