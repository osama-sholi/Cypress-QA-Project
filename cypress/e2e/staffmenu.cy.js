// const { before } = require("cypress/types/lodash");
// const { beforeEach } = require("mocha");

//const { expect } = require("chai");


describe('staff menu page',()=>{

    beforeEach("open login page and login in account",()=>{
        cy.viewport(1600,800);
        cy.visit("https://goal-dev.mdx.ac.uk/accounts/login/?next=/");
        cy.get("#id_username").type("YousefSamara");
        cy.get("#id_password").type("0568272806@y");

        cy.get('select[name="login_as"]')
        .select("staff");

        cy.get("button")
        .contains('Login')
        .should('have.attr','type','submit')
        .click();

        cy.get('#userInfoMenu').should("exist");
        cy.get(".list-group-item").
        contains('Open').click();

        cy.get('.navbar').contains("Staff").click();

    });


   it('open staff page check the entry',()=>{
    cy.get('input').should('exist');
   
   });

   it('open staff page check the button',()=>{
    cy.get('button[type=button]').should('exist');
   });

   it('open staff page check the remove option',()=>{
    cy.get('a').should('contains.text','Remove');
   });
   
   it('open staff page check the edit option',()=>{
    cy.get('a').should('contains.text','Edit');
   });

   it('open staff page check the entry input correctness',()=>{
    cy.get('#new_staff').type('ooooooo')
    cy.get('button[onclick="addStaff()"]').click();
    cy.get('#new_staff').type('ooooooo');
    cy.get('#new_staff').focused()
   });//you cant enter 2 staff that hAS THE SAME NAME

    //    it('open staff page check the notification select input correctness',()=>{

    //    // cy.get('a').contains('Edit').click();
    //     cy.get('#staffs').eq(1).find('a').should('contains.text','Edit').click();
    //     cy.get('select[name="permissions_Notification"]').find('option').should(($option)=>{
    //         expect($option).to.have.length(2);
    //         expect($option.eq(0)).to.have.value("Read");
    //         expect($option.eq(0)).to.have.value("Write");
    //     }).select("Read");
    //    cy.get('button[onclick="saveEditRow()"]').should('contains.text','Save').focused();
    //    });

       it('should test edit feature', () => {
        cy.get("#staffs tbody>tr:first-child a")
          .contains("Edit")
          .click();
        cy.get('#staffs tbody>tr:first-child')
          .should('have.css', 'display', 'none');
        cy.get('#staffs tbody>tr:nth-child(2)')
          .should('have.css', 'display', 'table-row');
      });
      

       it('open staff page check the entry input correctness if it takes numbers',()=>{
        cy.get('#new_staff').type('1234567')
        cy.get('#new_staff').focused()

       });

       it('open staff page check the entry input correctness if it takes special characters',()=>{
        cy.get('#new_staff').type('@yousef567123')
        cy.get('#new_staff').focused()
       });

});