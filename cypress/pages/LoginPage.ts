export class LoginPage {
  // method for logging into website
  userLogin(userName: string, password: string): void {
    cy.visit("https://www.saucedemo.com/"); // visit page
    cy.get("#user-name").type(userName); // enter user name
    cy.get("#password").type(password); // enter password
    cy.get("#login-button").click(); // click login button
  }
}
