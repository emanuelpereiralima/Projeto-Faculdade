document.addEventListener('DOMContentLoaded', () => {
    // Simulação de verificação de autenticação
    // Num sistema real, verificaríamos um Token ou Cookie aqui
    const userLoggedIn = true; // Mude para false para testar a segurança

    if (!userLoggedIn) {
        alert("Acesso negado. Por favor, faça login.");
        window.location.href = "../index.html";
        return;
    }

    // Funcionalidade: Saudação baseada na hora do dia
    const greetingElement = document.querySelector('.welcome-text p');
    const hour = new Date().getHours();
    
    let greeting = "Bem-vindo ao seu portal de saúde.";
    
    if (hour >= 5 && hour < 12) {
        greeting = "Bom dia! Pronto para cuidar da sua saúde?";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Boa tarde! Verifique os seus agendamentos.";
    } else {
        greeting = "Boa noite! Em caso de emergência, ligue 112.";
    }

    greetingElement.innerText = greeting;

    console.log("Dashboard carregado com sucesso.");
});