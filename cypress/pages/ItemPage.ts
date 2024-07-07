export class ItemPage {
  addItemToChart() {
    cy.get("#add-to-cart").click();
  }
  clickOnChart() {
    cy.get("#shopping_cart_container").click();
  }
}
