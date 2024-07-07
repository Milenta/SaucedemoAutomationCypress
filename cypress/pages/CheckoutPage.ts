export class CheckoutPage {
  fillDataAndContinue(name: string, lastName: string, zip: string) {
    cy.get("#first-name").type(name);
    cy.get("#last-name").type(lastName);
    cy.get("#postal-code").type(zip);
    cy.get("#continue").click();
  }
}
