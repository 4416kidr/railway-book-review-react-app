describe("sign up", () => {
  context("HTML form submission", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("main index test", () => {
      cy.get(".next_view_offset").click();
      cy.get(".now_card_view").should("include", "10");
      cy.get(".now_card_view").should("include", "20");
    });
  });
});
