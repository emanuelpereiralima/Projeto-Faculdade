describe('Funcionalidades do Paciente', () => {
  
  beforeEach(() => {
    // Loga direto ou visita a página se não tiver proteção real de backend
    cy.visit('http://127.0.0.1:5500/dashboard-paciente/agendamento.html');
  });

  it('Deve realizar um agendamento completo (Wizard)', () => {
    // Passo 1: Especialidade
    cy.contains('Cardiologia').click(); // Clica no card
    cy.contains('Próximo').click();

    // Passo 2: Médico
    cy.get('#step-2').should('be.visible');
    cy.contains('Dr.ª Ana Sousa').click();
    cy.contains('Próximo').click();

    // Passo 3: Data e Hora
    cy.get('#step-3').should('be.visible');
    
    // Preenche data futura (Data atual + 1 dia para evitar bloqueio)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    
    cy.get('#dateInput').type(dateString);
    
    // Seleciona horário (clica no label do time-slot)
    cy.contains('09:00').click();

    // Submeter
    cy.get('button[type="submit"]').click();

    // Verificar Sucesso
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Agendamento realizado com sucesso');
    });

    // Deve voltar para o dashboard
    cy.url().should('include', '/dashboard-paciente/index.html');
  });
});