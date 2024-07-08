export class ItemPage {
  addItemToChart(): void {
    cy.get("#add-to-cart").click();
  }
  clickOnChart(): void {
    cy.get("#shopping_cart_container").click();
  }
}
