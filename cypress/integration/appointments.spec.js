describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  xit("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones")

  });

  xit("should edit an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .get("[alt=Edit]")
      .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Adam Harvey", { delay: 40 });
    cy.get('[alt="Tori Malcolm"]').click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Adam Harvey")
    cy.contains(".appointment__card--show", "Tori Malcolm")

  });

  it("should cancel an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .get("[alt=Delete]")
      .click({ force: true });
    cy.get("[data-testid=appointment]").first().contains("Deleting").should('not.exist');
    cy.contains("Confirm").click();
    cy.contains("Deleting");
    cy.get("[data-testid=appointment]").first().contains("Deleting").should('exist');
    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist');
    cy.get("[data-testid=appointment]").first().contains("Deleting").should('not.exist');
  });
});