describe("sign up", () => {
  context("HTML form submission", () => {
    beforeEach(() => {
      cy.visit("/Main");
    });

    it("main test", () => {
      cy.get(".next_view_offset").click();
      cy.get(".now_card_view").should("include", "10");
      cy.get(".now_card_view").should("include", "20");
    });
  });
});
