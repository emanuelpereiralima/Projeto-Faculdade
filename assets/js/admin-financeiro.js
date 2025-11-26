document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('financeModal');
    const form = document.getElementById('financeForm');
    
    // Define a data de hoje no input date por padrão
    const dateInput = document.getElementById('finDate');
    if(dateInput) {
        dateInput.valueAsDate = new Date();
    }

    // --- FUNÇÕES DO MODAL ---
    window.openFinanceModal = function() {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('open'), 10);
        document.getElementById('finAmount').focus();
    }

    window.closeFinanceModal = function() {
        modal.classList.remove('open');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    window.onclick = function(event) {
        if (event.target == modal) closeFinanceModal();
    }

    // --- ADICIONAR TRANSAÇÃO ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = document.getElementById('finType').value; // income ou expense
        const amount = document.getElementById('finAmount').value;
        const desc = document.getElementById('finDesc').value;
        const cat = document.getElementById('finCat').value;
        
        // Formata a Data (DD/MM)
        const dateRaw = new Date(document.getElementById('finDate').value);
        const dateFormatted = dateRaw.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

        // Define classes e sinais baseados no tipo
        let amountClass = 'money-plus';
        let amountSign = '+ R$ ';
        
        if (type === 'expense') {
            amountClass = 'money-minus';
            amountSign = '- R$ ';
        }

        // Cria a nova linha
        const newRow = `
            <tr style="animation: fadeIn 0.5s; background-color: #fff;">
                <td>${dateFormatted}</td>
                <td>${desc}</td>
                <td>${cat}</td>
                <td class="${amountClass}">${amountSign}${amount}</td>
                <td><span class="status-indicator active">Novo</span></td>
            </tr>
        `;

        // Adiciona logo após o cabeçalho da tabela (topo da lista)
        const tbody = document.querySelector('#financeTable tbody');
        tbody.insertAdjacentHTML('afterbegin', newRow);

        alert(`Lançamento registrado com sucesso!`);
        form.reset();
        // Reseta a data para hoje
        document.getElementById('finDate').valueAsDate = new Date();
        closeFinanceModal();
    });

});