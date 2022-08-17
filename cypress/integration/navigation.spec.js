describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should('have.class', 'day-list__item--selected');
  });

  it("should navigate to Tuesday, then back to Monday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should('have.class', 'day-list__item--selected');

    cy.contains("[data-testid=day]", "Monday")
      .click()
      .should('have.class', 'day-list__item--selected');
  });

});