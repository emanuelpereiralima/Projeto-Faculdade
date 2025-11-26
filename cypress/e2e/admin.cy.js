describe('Funcionalidades do Admin', () => {
  
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/dashboard-admin/profissionais.html');
  });

  it('Deve cadastrar um novo profissional na tabela', () => {
    // Abrir Modal
    cy.contains('button', 'Novo Profissional').click();
    cy.get('#profModal').should('have.class', 'open');

    // Preencher Formulário
    cy.get('#profName').type('Dr. House');
    cy.get('#profEmail').type('house@vidaplus.com');
    cy.get('#profReg').type('CRM-123456');
    cy.get('#profSpec').select('Clínica Geral');

    // Salvar
    cy.get('#profForm').submit();

    // Verificar Alerta
    cy.on('window:alert', (str) => {
      expect(str).to.contain('cadastrado com sucesso');
    });

    // Verificar se foi adicionado ao topo da tabela
    cy.get('#profTable tbody tr').first().within(() => {
      cy.get('td').eq(0).should('contain', 'Dr. House');
      cy.get('td').eq(1).should('contain', 'CRM-123456');
      // Verifica se o status é "Novo"
      cy.contains('Novo').should('be.visible');
    });
  });
});