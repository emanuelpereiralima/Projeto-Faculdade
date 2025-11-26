document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('profModal');
    const form = document.getElementById('profForm');

    // --- FUNÇÕES DO MODAL ---
    window.openProfModal = function() {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('open'), 10);
        document.getElementById('profName').focus();
    }

    window.closeProfModal = function() {
        modal.classList.remove('open');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    window.onclick = function(event) {
        if (event.target == modal) closeProfModal();
    }

    // --- ADICIONAR PROFISSIONAL (Simulação) ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('profName').value;
        const email = document.getElementById('profEmail').value;
        const reg = document.getElementById('profReg').value;
        const spec = document.getElementById('profSpec').value;

        // Iniciais para Avatar
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        // HTML da Nova Linha
        const newRow = `
            <tr style="animation: fadeIn 0.5s; background-color: #e8f5e9;">
                <td>
                    <div class="profile-cell">
                        <div class="admin-avatar" style="background: #27ae60;">${initials}</div>
                        <div>
                            <strong>${name}</strong>
                            <small style="display: block; color: #888;">${email}</small>
                        </div>
                    </div>
                </td>
                <td>${reg}</td>
                <td>${spec}</td>
                <td><span class="status-indicator active">Novo</span></td>
                <td style="text-align: right;">
                    <button class="action-btn edit"><span class="material-icons">edit</span></button>
                    <button class="action-btn delete"><span class="material-icons">block</span></button>
                </td>
            </tr>
        `;

        // Adiciona no topo da tabela
        const tbody = document.querySelector('#profTable tbody');
        tbody.insertAdjacentHTML('afterbegin', newRow);

        alert(`Profissional ${name} cadastrado com sucesso!`);
        form.reset();
        closeProfModal();
    });

});