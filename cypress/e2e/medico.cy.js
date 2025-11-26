describe('Funcionalidades do Médico (PEP)', () => {
  
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/dashboard-profissional/prontuario.html');
  });

  it('Deve adicionar um medicamento à tabela de prescrição', () => {
    // 1. Mudar para a aba de Prescrição
    cy.contains('button', 'Prescrição').click();
    cy.get('#receita').should('have.class', 'active');

    // 2. Preencher dados do remédio
    cy.get('#medName').type('Amoxicilina 875mg');
    cy.get('#medDosage').type('1 comprimido a cada 12h por 7 dias');

    // 3. Adicionar
    cy.contains('button', 'Adicionar').click();

    // 4. Verificar se apareceu na tabela
    cy.get('#prescriptionTable tbody tr').last().within(() => {
      cy.get('td').eq(0).should('contain', 'Amoxicilina 875mg');
      cy.get('td').eq(1).should('contain', '1 comprimido a cada 12h');
    });

    // 5. Verificar se campos limparam
    cy.get('#medName').should('have.value', '');
  });

  it('Deve trocar de paciente via Modal', () => {
    // Abrir modal
    cy.contains('button', 'Trocar Paciente').click();
    cy.get('#patientSearchModal').should('have.class', 'open');

    // Selecionar Ana Beatriz
    cy.contains('Ana Beatriz').click();

    // Verificar se o cabeçalho mudou
    cy.get('#pName').should('contain', 'Ana Beatriz');
    cy.get('#pDetails').should('contain', '8 anos');
    
    // Verificar Alerta de Alergia (Lactose)
    cy.get('#pAllergy').should('be.visible').and('contain', 'Lactose');
  });
});