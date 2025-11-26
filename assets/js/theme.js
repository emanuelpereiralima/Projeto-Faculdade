document.addEventListener('DOMContentLoaded', () => {
    // 1. Verifica se já existe preferência salva
    const savedTheme = localStorage.getItem('theme');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Aplica o tema salvo ao carregar
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if(themeIcon) themeIcon.textContent = 'light_mode'; // Muda ícone para Sol
    }

    // 2. Função de Alternar (Toggle)
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Verifica qual tema está ativo agora
            const isDark = document.body.classList.contains('dark-mode');
            
            // Atualiza Ícone e LocalStorage
            if (isDark) {
                themeIcon.textContent = 'light_mode'; // Mostra Sol (para voltar ao claro)
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.textContent = 'dark_mode'; // Mostra Lua (para ir ao escuro)
                localStorage.setItem('theme', 'light');
            }
        });
    }
});