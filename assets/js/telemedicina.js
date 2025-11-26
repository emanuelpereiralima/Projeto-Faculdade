document.addEventListener('DOMContentLoaded', () => {
    // Referências do DOM
    const lobbyScreen = document.getElementById('lobby-screen');
    const videoRoom = document.getElementById('video-room');
    const localVideo = document.getElementById('localVideo');
    const btnMic = document.getElementById('btnMic');
    const btnCam = document.getElementById('btnCam');
    
    let localStream; // Para guardar o fluxo da webcam

    // --- Função 1: Entrar na Consulta (Sair do Lobby) ---
    window.startConsultation = async () => {
        try {
            // Solicita acesso à webcam e microfone reais
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            
            // Injeta o vídeo no elemento HTML
            localVideo.srcObject = localStream;

            // Troca as telas
            lobbyScreen.classList.add('hidden');
            videoRoom.classList.remove('hidden');

            // Simula mensagem de boas-vindas do médico após 2 segundos
            setTimeout(() => {
                receiveMessage("Bom dia! Estou a analisar os seus exames. Como se sente hoje?");
            }, 2000);

        } catch (error) {
            console.error("Erro ao acessar media:", error);
            alert("Não foi possível acessar a câmera. Verifique as permissões do navegador.\n\n(Para testar sem câmera, o sistema usará um modo apenas texto).");
            
            // Fallback: Entra na sala mesmo sem câmera (apenas áudio/chat)
            lobbyScreen.classList.add('hidden');
            videoRoom.classList.remove('hidden');
        }
    };

    // --- Função 2: Controlar Microfone (Mute) ---
    window.toggleMic = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled; // Inverte o estado
            
            // Atualiza visual do botão
            if (audioTrack.enabled) {
                btnMic.classList.remove('off');
                btnMic.innerHTML = '<span class="material-icons">mic</span>';
            } else {
                btnMic.classList.add('off');
                btnMic.innerHTML = '<span class="material-icons">mic_off</span>';
            }
        }
    };

    // --- Função 3: Controlar Câmera (On/Off) ---
    window.toggleCam = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            
            if (videoTrack.enabled) {
                btnCam.classList.remove('off');
                btnCam.innerHTML = '<span class="material-icons">videocam</span>';
                localVideo.style.opacity = "1";
            } else {
                btnCam.classList.add('off');
                btnCam.innerHTML = '<span class="material-icons">videocam_off</span>';
                localVideo.style.opacity = "0"; // Esconde o vídeo local
            }
        }
    };

    // --- Função 4: Chat ---
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    window.sendMessage = () => {
        const text = chatInput.value;
        if(text.trim() !== "") {
            // Cria HTML da mensagem enviada
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('msg', 'sent');
            
            const now = new Date();
            const timeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            msgDiv.innerHTML = `<p>${text}</p><span class="time">${timeString}</span>`;
            
            chatMessages.appendChild(msgDiv);
            chatInput.value = ""; // Limpa input
            
            // Auto-scroll para o final
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    // Permite enviar com Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Função Auxiliar para Receber Mensagem (Simulação)
    function receiveMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg', 'received');
        const now = new Date();
        const timeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        msgDiv.innerHTML = `<p>${text}</p><span class="time">${timeString}</span>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- Função 5: Encerrar Chamada ---
    window.endCall = () => {
        // Para a webcam para desligar a luzinha da câmera
        if(localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        
        if(confirm("Deseja encerrar a consulta e voltar ao início?")) {
            window.location.href = "index.html";
        } else {
            // Se cancelar, tenta reiniciar a cam (opcional, aqui apenas recarrega)
            window.location.reload(); 
        }
    };
});