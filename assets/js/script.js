document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elementos do DOM ---
    const loginContainer = document.getElementById('login-container');
    const recoveryContainer = document.getElementById('recovery-container');
    const headerDescription = document.getElementById('header-description');
    
    const btnForgot = document.getElementById('btn-forgot-password');
    const btnBack = document.getElementById('btn-back-login');
    
    const loginForm = document.getElementById('loginForm');
    const recoveryForm = document.getElementById('recoveryForm');
    const btnSendRecovery = document.getElementById('btnSendRecovery');

    // --- Lógica de Alternância (Toggle) ---
    
    // Ir para Recuperação de Senha
    if(btnForgot) {
        btnForgot.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.classList.add('hidden');
            recoveryContainer.classList.remove('hidden');
            headerDescription.textContent = "Recuperação de Acesso";
        });
    }

    // Voltar para Login
    if(btnBack) {
        btnBack.addEventListener('click', (e) => {
            e.preventDefault();
            recoveryContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
            headerDescription.textContent = "Sistema de Gestão Hospitalar";
        });
    }

// --- Lógica de Login com Roteamento de 3 Perfis ---
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            
            // Converte para minúsculas para facilitar a verificação
            const email = emailInput.value.toLowerCase().trim();
            const password = passwordInput.value;

            if (email && password) {
                console.log(`Tentativa de login: ${email}`);
                
                // 1. Verifica se é ADMIN
                if (email.includes('admin') || email.includes('gestor') || email.includes('root')) {
                    alert(`Acesso Administrativo concedido.\nBem-vindo ao Painel de Gestão.`);
                    window.location.href = 'dashboard-admin/index.html';
                } 
                // 2. Verifica se é MÉDICO
                else if (email.includes('medico') || email.includes('doutor') || email.includes('dr')) {
                    alert(`Login realizado com sucesso!\nBem-vindo, Doutor(a).`);
                    window.location.href = 'dashboard-profissional/index.html';
                } 
                // 3. Caso contrário, é PACIENTE
                else {
                    alert(`Login realizado com sucesso!\nBem-vindo ao VidaPlus.`);
                    window.location.href = 'dashboard-paciente/index.html';
                }

            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // --- Lógica de Envio de Recuperação (Simulação) ---
    if(recoveryForm) {
        recoveryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailRec = document.getElementById('recoveryEmail').value;

            if(emailRec) {
                const originalBtnText = btnSendRecovery.innerText;
                btnSendRecovery.innerText = "Enviando...";
                btnSendRecovery.disabled = true;
                btnSendRecovery.style.opacity = "0.7";

                setTimeout(() => {
                    alert(`✅ Link de recuperação enviado para: ${emailRec}`);
                    btnSendRecovery.innerText = originalBtnText;
                    btnSendRecovery.disabled = false;
                    btnSendRecovery.style.opacity = "1";
                    if(btnBack) btnBack.click(); 
                }, 1500);
            } else {
                alert("Insira um e-mail válido.");
            }
        });
    }

    // --- Lógica do Botão de Copiar (Popup de Teste) ---
    const copyButtons = document.querySelectorAll('.btn-copy');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-value');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalContent = button.innerHTML;
                // Ícone de Check
                button.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar:', err);
            });
        });
    });
});