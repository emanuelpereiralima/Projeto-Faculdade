document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de Pesquisa (Filtro) ---
    const searchInput = document.getElementById('searchInput');

    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            const termo = this.value.toLowerCase();
            
            // Seleciona todos os cards visíveis nas duas abas
            const cards = document.querySelectorAll('.history-card');

            cards.forEach(card => {
                const textoCard = card.innerText.toLowerCase();
                
                if(textoCard.includes(termo)) {
                    card.style.display = "flex"; // Mostra
                } else {
                    card.style.display = "none"; // Esconde
                }
            });
        });
    }

    // --- Fechar Modal ao Clicar Fora ---
    const modalOverlay = document.getElementById('detailsModal');
    if(modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                window.closeDetails();
            }
        });
    }

});

// --- FUNÇÕES GLOBAIS (Acessíveis pelo onclick do HTML) ---

// 1. Lógica de Abas (Tabs)
window.openTab = function(tabName) {
    // Esconder todos os conteúdos
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Remover classe 'active' de todos os botões
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Mostrar o conteúdo alvo e ativar o botão clicado
    const targetContent = document.getElementById(tabName);
    if(targetContent) targetContent.classList.add('active');
    
    // Ativa o botão que foi clicado (usa o evento do mouse)
    if(event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 2. Simulação de Download
window.downloadFile = function(nomeArquivo) {
    alert(`📥 Iniciando download de: ${nomeArquivo}\n\n(Isto é uma simulação. Num sistema real, o arquivo seria baixado.)`);
}

// 3. Abrir Modal de Detalhes
window.openDetails = function(especialidade, medico, diagnostico, receita, recomendacoes) {
    // Referências aos elementos do Modal
    const modalOverlay = document.getElementById('detailsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDoctor = document.getElementById('modalDoctor');
    const modalDiagnosis = document.getElementById('modalDiagnosis');
    const modalPrescription = document.getElementById('modalPrescription');
    const modalNotes = document.getElementById('modalNotes');

    // Preenche os dados
    if(modalTitle) modalTitle.innerText = `Detalhes - ${especialidade}`;
    if(modalDoctor) modalDoctor.innerText = medico;
    if(modalDiagnosis) modalDiagnosis.innerText = diagnostico;
    if(modalPrescription) modalPrescription.innerText = receita;
    if(modalNotes) modalNotes.innerText = recomendacoes;

    // Mostra o modal (Troca a classe hidden pela open)
    if(modalOverlay) {
        modalOverlay.classList.remove('hidden');
        // Pequeno delay para permitir a transição CSS (fade in)
        setTimeout(() => {
            modalOverlay.classList.add('open');
        }, 10);
    }
}

// 4. Fechar Modal
window.closeDetails = function() {
    const modalOverlay = document.getElementById('detailsModal');
    
    if(modalOverlay) {
        modalOverlay.classList.remove('open');
        
        // Espera a animação terminar (300ms) para esconder totalmente
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
        }, 300);
    }
}