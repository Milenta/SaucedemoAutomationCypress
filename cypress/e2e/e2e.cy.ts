/// <reference types="cypress" />
const loginUser = require("../fixtures/loginUser.json");

import { LoginPage } from "../pages/LoginPage";
const loginPage = new LoginPage();

describe("Saucedemo automation tests", () => {
  // Napraviti Test Case koji će testirati uspešno dodavanje proizvoda u korpu

  beforeEach(() => {
    cy.viewport(Cypress.env().viewportWidth, Cypress.env().viewportHeight);
    loginPage.userLogin(loginUser.userName, loginUser.password);
  });

  it("Add items to shopping-cart", () => {
    cy.url().should("contain", "https://www.saucedemo.com/inventory.html");
    cy.get(".btn_inventory").first().click();
    cy.get(".shopping_cart_link").invoke("text").should("contain", "1");
    cy.get(".btn_inventory").last().click();
    cy.get(".shopping_cart_link").invoke("text").should("contain", "2");
  });

  // Napraviti Test Case koji će testirati uspešno uklanjanje proizvoda iz korpe (uklanjanje
  // jednog ili više proizvoda vaš izbor)

  it("Remove items from shopping-cart", () => {
    cy.url().should("contain", "https://www.saucedemo.com/inventory.html");
    cy.get(".btn_inventory").first().click();
    cy.get(".shopping_cart_link").invoke("text").should("contain", "1");
    cy.get(".btn_inventory").last().click();
    cy.get(".shopping_cart_link").invoke("text").should("contain", "2");
    cy.get(".btn_inventory").first().click();
    cy.get(".btn_inventory").last().click();
    cy.get(".shopping_cart_link").invoke("text").should("contain", "");
  });

  // Napraviti Test Case koji će testirati akciju uspešne kupovine proizvoda

  let itemTitile = "";
  let cartTitile = "";
  it("Buy item from shopping-cart", () => {
    cy.url().should("contain", "https://www.saucedemo.com/inventory.html");
    cy.get("#item_4_title_link")
      .invoke("text")
      .then((item_name) => {
        itemTitile = item_name;
        cy.wrap(itemTitile).as("itemTitile");
      });
    cy.get("#item_4_title_link").click();
    cy.get("#add-to-cart").click();
    cy.get("#shopping_cart_container").click();
    cy.get("#checkout").click();
    cy.get("#first-name").type("Marko");
    cy.get("#last-name").type("Milentijevic");
    cy.get("#postal-code").type("11000");
    cy.get("#continue").click();
    cy.get("#item_4_title_link")
      .invoke("text")
      .then((cart_name) => {
        cartTitile = cart_name;
        cy.wrap(cartTitile).as("cartTitile");

        cy.get("@itemTitile").then((itemTitile) => {
          expect(itemTitile).to.contain(cartTitile);
        });
      });
    cy.get("#finish").click();
    cy.get('[data-test="title"]').should("contain.text", "Checkout: Complete!");
  });

  //Napraviti Test Case koji će testirati uspešno sabiranje cena više proizvoda kad se vrši
  // kupovina 2+ proizvoda

  it("Adding item prices for products", () => {
    let expectedTotal = 0;

    cy.get(".inventory_item_price")
      .eq(0)
      .then(($num1) => {
        // parse text to float
        const num1 = parseFloat($num1.text().replace("$", ""));
        // get element id #num2
        cy.get(".inventory_item_price")
          .eq(1)
          .then(($num2) => {
            // parse text to float
            const num2 = parseFloat($num2.text().replace("$", ""));
            expectedTotal = num1 + num2;
            // expect/assert number total equal to some expected total
            expect(num1 + num2).equal(expectedTotal);
          });
      });
    cy.get(".btn_inventory ").eq(0).click();
    cy.get(".btn_inventory ").eq(1).click();
    cy.get("#shopping_cart_container").click();
    cy.get("#checkout").click();
    cy.get("#first-name").type("Marko");
    cy.get("#last-name").type("Milentijevic");
    cy.get("#postal-code").type("11000");
    cy.get("#continue").click();
    cy.get('[data-test="subtotal-label"]')
      .invoke("text")
      .then(($cartTotal) => {
        // parse text to float
        const cartT = parseFloat($cartTotal.replace("Item total: $", ""));
        expect(cartT).equal(expectedTotal);
      });
  });

  // Napraviti Test Case koji će validaciju Home page stranice (stranica posle logovanja)
  // vršiti preko bilo koje slike proizvoda, ali uzeti u obzir da proizvodi prikazani na Home
  // page se menjaju vremenom
});
