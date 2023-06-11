describe("sign up", () => {
  context("HTML form submission", () => {
    beforeEach(() => {
      cy.visit("/SignUp");
    });
    const test_pw = "pass1234";

    function generateRandomLetter() {
      const alphabet = "abcdefghijklmnopqrstuvwxyz";

      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    function generateRandomStrings(n) {
      let concatenatedString = "";
      for (let i = 0; i < 3; i++) {
        concatenatedString += generateRandomLetter();
      }
      return concatenatedString;
    }

    function RandomEmail() {
      let first_half = generateRandomStrings(3);
      let second_half = generateRandomStrings(3);
      const email = first_half + "@" + second_half;
      return email;
    }

    it("sing up test", () => {
      cy.get("input[name=username]").type("tofu");
      cy.get("input[name=email]").type(RandomEmail());
      cy.get("input[name=icon]").attachFile("./../../src/icon.png");
      cy.get("input[name=password]").type(test_pw);
      cy.get("input[name=passwordConfirm]").type(test_pw);
      cy.get("form").submit();
      cy.url().should("include", "/main");
    });

    // it("get users test", () => {
    //   cy.get('.getUserButton').click()
    // })
  });
});
