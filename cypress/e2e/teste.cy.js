  /// <reference types = "cypress"/>

  const perfil = require('../fixtures/perfil_sisprev.json');
  const {faker} = require('@faker-js/faker');
  import testePage from '../support/teste-page';

  context('Testando duas formas de se utilizar arquivos de dados', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });
    beforeEach(() => {
        cy.visit('http://proxima.sisprevweb.com.br/tocantins/Login/LoginNew.aspx');

        // adicionado a função antes de qualquer teste

        cy.fixture('perfil_sisprev').then(dados =>{
            cy.login(dados.usuario,dados.senha,{log:false});
        })
      

    });
    afterEach(() => {
        cy.screenshot();
    });

    it('Realizar login com arquivos de dados', () => {
        // criar os dados na pasta fixtures

        cy.get('#txtUSER').type(perfil.usuario);
        cy.get('#txtPassWord').type(perfil.senha);
        cy.get('#btnLogin').click();
    });

    it('Fazer o login com sucesso - usando fixture', () => {

        cy.fixture('perfil_sisprev').then(dados =>{
        cy.get('#txtUSER').type(dados.usuario);
        cy.get('#txtPassWord').type(dados.senha, {log:false});
        cy.get('#btnLogin').click();
        });
    });

    it.only('comandos customizados', () => {
     
        cy.contains('Cadastros').trigger('mouseover', {force:true})
        cy.contains('Pessoas').click({force:true})
        cy.contains('Consulta').click({force:true})

        //Criando usuario novo

        cy.get('#ContentToolBar_btnNovo').click();
        cy.get('#ContentCampos_TabContainer1_tabInformacoes_txtPessoaNome').type(faker.name.fullName());
        cy.get('#ContentCampos_TabContainer1_tabInformacoes_ddlPessoaSexo').select('M');
        cy.get('#ContentCampos_TabContainer1_tabInformacoes_txtPessoaCPF').type('295.782.100-19');
        cy.get('#ContentCampos_TabContainer1_tabInformacoes_clpPessoaDataNasc').type('01/02/1990');
        cy.get('#ContentCampos_TabContainer1_tabInformacoes_txtPessoaNomeMae').type(faker.name.fullName());
        cy.get('#ContentToolBar_btnAvanca').click();

        // Adicionando os dados pessoais (Iniciais)

        cy.get('#ContentCampos_TabContainer1_tabComplementar_txtPessoaNomePAI').type(faker.name.fullName());
        cy.get('#ContentCampos_TabContainer1_tabComplementar_ddlPessoaUFCidadeNat').select('MT')
        cy.get('#ContentCampos_TabContainer1_tabComplementar_ddlPessoaCidadeNat').select('VARZEA GRANDE');
        cy.get('#ContentCampos_TabContainer1_tabComplementar_ddlPessoaRaca').select(1);
        cy.get('#ContentCampos_TabContainer1_tabComplementar_ddlEscolaridade').select(4);


        // Finalizando o cadastro de pessoas 

        cy.get('#__tab_ContentCampos_TabContainer1_tabComplemento > span').click()
        cy.get('#ContentCampos_TabContainer1_tabComplemento_txtPessoaEnderecoCEP').type('78120-820');
        cy.get('#ContentCampos_TabContainer1_tabComplemento_ddlPessoaTipoLogradouro').select('FAZENDA');
        cy.get('#ContentCampos_TabContainer1_tabComplemento_txtPessoaEnderecoRua').type('Teste');
        cy.get('#ContentCampos_TabContainer1_tabComplemento_txtPessoaEnderecoNumero').type('10');
        cy.get('#ContentCampos_TabContainer1_tabComplemento_txtPessoaEnderecoBairro').type('teste 123');
        cy.get('#ContentCampos_TabContainer1_tabComplemento_ddlPessoaEnderecoUF').select('MT');
        cy.get('#ContentCampos_TabContainer1_tabComplemento_ddlPessoaCidadeEnde').select('VARZEA GRANDE')
        cy.get('#ContentCampos_TabContainer1_tabComplemento_txtPessoaFoneCel').type('65998886132');
        cy.get('#ContentToolBar_btnSalvar').click();
        cy.get('#ContentToolBar_btnSalvarID').click();

    });

    it('teste', () => {
        testePage.editarCadastro()

        
    });
  });