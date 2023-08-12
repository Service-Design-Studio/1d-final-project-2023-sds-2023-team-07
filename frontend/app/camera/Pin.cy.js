import React from "react";
import Pin from "./Pin";

describe("<Pin />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Pin />);
  });

  it("has 4 pin input fields", () => {
    cy.mount(<Pin />);
    cy.get("input").should("have.length", 4);
  });

  it("has a submit button", () => {
    cy.mount(<Pin />);
    cy.get("button").should("have.text", "AUTH NOW");
  });

  it("displays error message when pins are not filled", () => {
    cy.mount(<Pin />);
    cy.get("input").eq(0).type("123");
    cy.get("button").click();
    cy.contains("Please fill up all pins");
  });

  it("displays incorrect pin message", () => {
    cy.mount(<Pin />);
    // Stub the API response with failed authentication
    cy.intercept("POST", "**/authenticate/pin", { authenticated: false });
    cy.get("input").eq(0).type("1234");
    cy.get("button").click();
    cy.contains("Incorrect Pin");
  });

  it("navigates to account page on successful authentication", () => {
    cy.mount(<Pin />);
    // Stub the API response with successful authentication
    cy.intercept("POST", "**/authenticate/pin", { authenticated: true });
    cy.get("input").eq(0).type("1234");
    cy.get("button").click();
    cy.get("@router:push").should("be.calledWithMatch", "/account");
  });
});
