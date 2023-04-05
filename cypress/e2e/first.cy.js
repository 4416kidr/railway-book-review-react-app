/// <reference path="../../.yarn/unplugged/cypress-npm-12.9.0-0c9e067ccc/node_modules/cypress/types/index.d.ts" />
describe("sign up", () => {
  context("HTML form submission", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    const test_pw = "pass1234";

    it("displays errors on login", () => {
      cy.get("input[name=email]").type("@email.com");
      cy.get("input[name=password]").type(test_pw);

      cy.get("p.error").should("be.visible").should("contain", "Error");

      cy.url().should("include", "/");
    });

    it("not displays errors on login", () => {
      cy.get("input[name=email]").type("good@email.com");
      cy.get("input[name=password]").type(test_pw);

      cy.get("p.error").should("be.hidden");
      cy.get("form").submit();

      cy.url().should("include", "/home");
    });
  });
});
