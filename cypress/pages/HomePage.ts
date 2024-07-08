export class HomePage {
  validateHomePage(): void {
    cy.url().should("contain", "https://www.saucedemo.com/inventory.html");
  }
  selectInventoryNumber(num: number): void {
    cy.get(".btn_inventory").eq(num).click();
  }
  checkShopingItemsNumber(num: string): void {
    cy.get(".shopping_cart_link").invoke("text").should("contain", num);
  }
  getItemTitle(itemTitile: string): void {
    cy.get("#item_4_title_link")
      .invoke("text")
      .then((item_name) => {
        itemTitile = item_name;
        cy.wrap(itemTitile).as("itemTitile");
      });
  }
  // open item in full screen
  openItem(id: string): void {
    cy.get(id).click();
  }
}
