const loginData = require("../fixtures/loginDataDrivenUsers.json");
const loginUser = require("../fixtures/loginUser.json");

import { LoginPage } from "../pages/LoginPage";
const loginPage = new LoginPage();

interface userData {
  userName: string;
  password: string;
  testName: string;
  errorMessage: string;
}

describe("Login tests", () => {
  // Napraviti 5 Test Case-eva koji će testirati Log In funkcionalnost aplikacije
  it("Log in test with standard user", () => {
    loginPage.userLogin(loginUser.userName, loginUser.password);
    // cy.visit("https://www.saucedemo.com/");
    // cy.get("#user-name").type("standard_user");
    // cy.get("#password").type("secret_sauce");
    // cy.get("#login-button").click();
    cy.url().should("contain", "https://www.saucedemo.com/inventory.html");
  });

  interface userData {
    userName: string;
    password: string;
    testName: string;
    errorMessage: string;
  }

  loginData.forEach((lData: userData) => {
    it("Log in test " + lData.testName, () => {
      loginPage.userLogin(lData.userName, lData.password);
      cy.get('[data-test="error"]').should("have.text", lData.errorMessage);
    });
  });
});
