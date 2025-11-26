document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('patientAdminModal');
    const form = document.getElementById('adminPatientForm');

    // --- Funções do Modal ---
    window.openPatientAdminModal = function() {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('open'), 10);
        document.getElementById('admName').focus();
    }

    window.closePatientAdminModal = function() {
        modal.classList.remove('open');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    window.onclick = function(event) {
        if (event.target == modal) closePatientAdminModal();
    }

    // --- Adicionar Paciente na Tabela (Admin) ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coleta dados
        const name = document.getElementById('admName').value;
        const cpf = document.getElementById('admCpf').value;
        const email = document.getElementById('admEmail').value || "Sem e-mail";
        const insurance = document.getElementById('admInsurance').value;
        
        // Data de hoje
        const today = new Date().toLocaleDateString('pt-BR');

        // Iniciais para Avatar
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        // Cria HTML da linha
        const newRow = `
            <tr style="animation: fadeIn 0.5s; background-color: #e3f2fd;">
                <td>
                    <div class="profile-cell">
                        <div class="admin-avatar" style="background: #e74c3c;">${initials}</div>
                        <div>
                            <strong>${name}</strong>
                            <small style="display: block; color: #888;">${email}</small>
                        </div>
                    </div>
                </td>
                <td>${cpf}</td>
                <td>${insurance}</td>
                <td>${today}</td>
                <td><span class="status-indicator active">Novo</span></td>
                <td style="text-align: right;">
                    <button class="action-btn edit"><span class="material-icons">edit</span></button>
                    <button class="action-btn delete"><span class="material-icons">delete</span></button>
                </td>
            </tr>
        `;

        // Insere no topo da tabela
        const tbody = document.querySelector('#adminPatientTable tbody');
        tbody.insertAdjacentHTML('afterbegin', newRow);

        alert(`Ficha de ${name} criada com sucesso!`);
        form.reset();
        closePatientAdminModal();
    });

});