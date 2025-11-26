describe('Fluxo de Autenticação', () => {
  
  beforeEach(() => {
    // Ajuste a porta (5500) conforme seu Live Server
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('Deve fazer login como PACIENTE e redirecionar corretamente', () => {
    cy.get('#email').type('paciente@vidaplus.com');
    cy.get('#password').type('123456');
    cy.get('button[type="submit"]').click();

    // Verifica o Alerta
    cy.on('window:alert', (str) => {
      expect(str).to.contain('Bem-vindo ao VidaPlus');
    });

    // Verifica a URL de destino
    cy.url().should('include', '/dashboard-paciente/index.html');
    cy.contains('Olá, João Silva').should('be.visible');
  });

  it('Deve fazer login como MÉDICO e redirecionar corretamente', () => {
    cy.get('#email').type('medico@vidaplus.com');
    cy.get('#password').type('123456');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Bem-vindo, Doutor');
    });

    cy.url().should('include', '/dashboard-profissional/index.html');
    cy.get('.sidebar.doctor-theme').should('be.visible'); // Verifica se carregou o tema verde
  });

  it('Deve fazer login como ADMIN e redirecionar corretamente', () => {
    cy.get('#email').type('admin@vidaplus.com');
    cy.get('#password').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.contain('Acesso Administrativo concedido');
    });

    cy.url().should('include', '/dashboard-admin/index.html');
    cy.contains('Painel de Controle').should('be.visible');
  });
});