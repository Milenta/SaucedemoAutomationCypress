/// <reference types="cypress" />
const loginUser: user = require("../fixtures/loginUser.json");
const checkoutInfo: userDetails = require("../fixtures/checkoutInfo.json");

import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ItemPage } from "../pages/ItemPage";
import { ChartPage } from "../pages/ChartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

const loginPage = new LoginPage();
const homePage = new HomePage();
const itemPage = new ItemPage();
const chartPage = new ChartPage();
const checkoutPage = new CheckoutPage();

type user = {
  userName: string;
  password: string;
};
type userDetails = {
  name: string;
  lastName: string;
  zip: string;
};

describe("Saucedemo automation tests", () => {
  // Napraviti Test Case koji će testirati uspešno dodavanje proizvoda u korpu

  beforeEach(() => {
    cy.viewport(Cypress.env().viewportWidth, Cypress.env().viewportHeight);
    loginPage.userLogin(loginUser.userName, loginUser.password);
  });

  it("Add items to shopping-cart", () => {
    homePage.validateHomePage();
    homePage.selectInventoryNumber(0);
    homePage.checkShopingItemsNumber("1");
    homePage.selectInventoryNumber(1);
    homePage.checkShopingItemsNumber("2");
  });

  // Napraviti Test Case koji će testirati uspešno uklanjanje proizvoda iz korpe (uklanjanje
  // jednog ili više proizvoda vaš izbor)

  it("Remove items from shopping-cart", () => {
    homePage.validateHomePage();
    homePage.selectInventoryNumber(0);
    homePage.checkShopingItemsNumber("1");
    homePage.selectInventoryNumber(1);
    homePage.checkShopingItemsNumber("2");
    homePage.selectInventoryNumber(0);
    homePage.selectInventoryNumber(1);
    homePage.checkShopingItemsNumber("");
  });

  // Napraviti Test Case koji će testirati akciju uspešne kupovine proizvoda

  let itemTitile: string;
  let cartTitile: string;
  it("Buy item from shopping-cart", () => {
    homePage.validateHomePage();
    homePage.getItemTitle(itemTitile);
    homePage.openItem("#item_4_title_link");
    itemPage.addItemToChart();
    itemPage.clickOnChart();
    chartPage.clickCheckout();
    checkoutPage.fillDataAndContinue(
      checkoutInfo.name,
      checkoutInfo.lastName,
      checkoutInfo.zip
    );
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
    let expectedTotal: number;
    homePage.validateHomePage();
    cy.get(".inventory_item_price")
      .eq(0)
      .then(($num1) => {
        const num1 = parseFloat($num1.text().replace("$", ""));
        cy.get(".inventory_item_price")
          .eq(1)
          .then(($num2) => {
            const num2 = parseFloat($num2.text().replace("$", ""));
            expectedTotal = num1 + num2;
            expect(num1 + num2).equal(expectedTotal);
          });
      });
    homePage.selectInventoryNumber(0);
    homePage.selectInventoryNumber(1);
    itemPage.clickOnChart();
    chartPage.clickCheckout();
    checkoutPage.fillDataAndContinue(
      checkoutInfo.name,
      checkoutInfo.lastName,
      checkoutInfo.zip
    );
    cy.get('[data-test="subtotal-label"]')
      .invoke("text")
      .then(($cartTotal) => {
        const cartT = parseFloat($cartTotal.replace("Item total: $", ""));
        expect(cartT).equal(expectedTotal);
      });
  });

  // Napraviti Test Case koji će validaciju Home page stranice (stranica posle logovanja)
  // vršiti preko bilo koje slike proizvoda, ali uzeti u obzir da proizvodi prikazani na Home
  // page se menjaju vremenom

  it("Validate home page by checking existance of picture", () => {
    homePage.validateHomePage();
    cy.get(".inventory_item_img > a > img")
      .first()
      .invoke("attr", "src")
      .should("contain", ".jpg");
  });
});
