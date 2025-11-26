document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const lobbyScreen = document.getElementById('lobby-screen');
    const videoRoom = document.getElementById('video-room');
    const localVideo = document.getElementById('localVideo');
    const btnMic = document.getElementById('btnMic');
    const btnCam = document.getElementById('btnCam');
    
    let localStream;

    // --- 1. Iniciar Atendimento (Médico) ---
    window.startDoctorCall = async () => {
        try {
            // Pede permissão para Webcam e Microfone
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            
            // Mostra o vídeo do médico na caixa pequena (PiP)
            localVideo.srcObject = localStream;

            // Troca de tela
            lobbyScreen.classList.add('hidden');
            videoRoom.classList.remove('hidden');

            // Mensagem automática no chat
            setTimeout(() => {
                receiveMessage("O paciente conectou o áudio.");
            }, 1000);

        } catch (error) {
            console.error("Erro na câmera:", error);
            alert("Não foi possível acessar sua câmera. Verifique as permissões.");
            // Entra mesmo assim (modo fallback)
            lobbyScreen.classList.add('hidden');
            videoRoom.classList.remove('hidden');
        }
    };

    // --- 2. Controles de Mídia ---
    window.toggleMic = () => {
        if (localStream) {
            const track = localStream.getAudioTracks()[0];
            track.enabled = !track.enabled;
            btnMic.classList.toggle('off');
            btnMic.innerHTML = track.enabled ? '<span class="material-icons">mic</span>' : '<span class="material-icons">mic_off</span>';
        }
    };

    window.toggleCam = () => {
        if (localStream) {
            const track = localStream.getVideoTracks()[0];
            track.enabled = !track.enabled;
            btnCam.classList.toggle('off');
            btnCam.innerHTML = track.enabled ? '<span class="material-icons">videocam</span>' : '<span class="material-icons">videocam_off</span>';
            localVideo.style.opacity = track.enabled ? "1" : "0";
        }
    };

    // --- 3. Chat do Médico ---
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    window.sendDoctorMessage = () => {
        const text = chatInput.value;
        if(text.trim()) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('msg', 'sent');
            // Estilo diferente para msg do médico se quiser (verde escuro)
            msgDiv.style.background = "#b2dfdb"; 
            
            const now = new Date();
            const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            msgDiv.innerHTML = `<p>${text}</p><span class="time">${time}</span>`;
            chatMessages.appendChild(msgDiv);
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    // Receber msg (Simulação)
    function receiveMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg', 'received');
        const now = new Date();
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        msgDiv.innerHTML = `<p>${text}</p><span class="time">${time}</span>`;
        chatMessages.appendChild(msgDiv);
    }

    // --- 4. Encerrar ---
    window.endDoctorCall = () => {
        if(confirm("Deseja finalizar o atendimento e voltar para a agenda?")) {
            // Desliga a webcam
            if(localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            window.location.href = "index.html"; // Volta para o Dashboard
        }
    };
});