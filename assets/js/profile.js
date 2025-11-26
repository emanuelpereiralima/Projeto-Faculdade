document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lógica de Upload de Foto (Preview) ---
    const uploadInput = document.getElementById('uploadPhoto');
    const profileImage = document.getElementById('profileImage');

    uploadInput.addEventListener('change', function() {
        const file = this.files[0];

        if (file) {
            // Verifica se é imagem
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecione apenas arquivos de imagem.');
                return;
            }

            // FileReader: Lê o arquivo localmente sem enviar ao servidor
            const reader = new FileReader();

            reader.onload = function(e) {
                // Atualiza o src da imagem com o resultado da leitura
                profileImage.src = e.target.result;
            }

            reader.readAsDataURL(file);
        }
    });

    // --- 2. Lógica de Salvar (Simulação) ---
    const profileForm = document.getElementById('profileForm');
    const saveBtn = document.getElementById('saveBtn');
    const inputName = document.getElementById('inputName');
    const displayName = document.getElementById('displayName');

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Feedback Visual de "Salvando..."
        const originalText = saveBtn.innerText;
        saveBtn.innerText = "Salvando...";
        saveBtn.disabled = true;
        saveBtn.style.opacity = "0.7";

        // Simula tempo de requisição ao servidor
        setTimeout(() => {
            // Atualiza o nome no cabeçalho se ele tiver mudado
            if(inputName.value) {
                displayName.innerText = inputName.value;
                // Opcional: Atualizar o nome na Sidebar também, se quiser
                // document.getElementById('userName').innerText = inputName.value;
            }

            alert("✅ Dados atualizados com sucesso!");

            // Restaura o botão
            saveBtn.innerText = originalText;
            saveBtn.disabled = false;
            saveBtn.style.opacity = "1";

        }, 1000);
    });
});