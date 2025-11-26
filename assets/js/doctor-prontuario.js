document.addEventListener('DOMContentLoaded', () => {

    // 1. Simulação de Salvar Evolução
    const evolutionForm = document.getElementById('evolutionForm');
    if(evolutionForm) {
        evolutionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = evolutionForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Salvando...";
            btn.disabled = true;

            setTimeout(() => {
                alert("✅ Evolução clínica salva no histórico do paciente.");
                btn.innerText = originalText;
                btn.disabled = false;
                evolutionForm.reset();
            }, 800);
        });
    }

    // 2. Fechar modal clicando fora
    const patientModal = document.getElementById('patientSearchModal');
    window.onclick = function(event) {
        if (event.target == patientModal) {
            closePatientModal();
        }
    }
});

/* --- FUNÇÕES GLOBAIS --- */

// Abas
window.openPepTab = function(tabName) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    if(event && event.currentTarget) event.currentTarget.classList.add('active');
}

// Medicamentos
window.addMedication = function() {
    const medName = document.getElementById('medName');
    const medDosage = document.getElementById('medDosage');
    const tableBody = document.querySelector('#prescriptionTable tbody');

    if (medName.value && medDosage.value) {
        const rowHTML = `<tr><td>${medName.value}</td><td>${medDosage.value}</td><td class="action-cell" onclick="removeRow(this)"><span class="material-icons remove-icon">close</span></td></tr>`;
        tableBody.insertAdjacentHTML('beforeend', rowHTML);
        medName.value = '';
        medDosage.value = '';
        medName.focus();
    } else {
        alert("Preencha o nome e a posologia.");
    }
}

window.removeRow = function(element) {
    element.parentElement.remove();
}

// Modal de Pacientes
window.openPatientModal = function() {
    const modal = document.getElementById('patientSearchModal');
    if(modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('open'), 10);
        setTimeout(() => document.getElementById('modalSearchInput').focus(), 100);
    }
}

window.closePatientModal = function() {
    const modal = document.getElementById('patientSearchModal');
    if(modal) {
        modal.classList.remove('open');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

window.selectPatient = function(name, details, allergy) {
    console.log("Trocando para:", name); // Debug no console

    // 1. Atualiza Nome e Detalhes (Idade, Sexo, Convênio)
    const elName = document.getElementById('pName');
    const elDetails = document.getElementById('pDetails');
    
    if(elName) elName.innerText = name;
    if(elDetails) elDetails.innerText = details;
    
    // 2. Atualiza Alerta de Alergia
    const elAllergy = document.getElementById('pAllergy');
    if(elAllergy) {
        if (allergy && allergy !== 'Nenhuma' && allergy !== '') {
            // Se tem alergia, mostra o alerta vermelho
            elAllergy.innerHTML = `⚠️ Alérgico: <strong>${allergy}</strong>`;
            elAllergy.style.display = 'inline-flex';
            elAllergy.classList.remove('hidden');
        } else {
            // Se não tem, esconde a etiqueta
            elAllergy.style.display = 'none';
        }
    }

    // 3. Limpa a tela para o novo atendimento
    const clinicalInput = document.querySelector('.clinical-input');
    if(clinicalInput) clinicalInput.value = ""; // Limpa texto da evolução
    
    const tableBody = document.querySelector('#prescriptionTable tbody');
    if(tableBody) tableBody.innerHTML = ""; // Limpa tabela de remédios
    
    // 4. Fecha o modal
    closePatientModal();

}