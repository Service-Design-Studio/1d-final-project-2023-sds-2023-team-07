import React from "react";
import Base from "./Base";

describe("<Base />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Base />);
  });

  it("has a logo", () => {
    cy.mount(<Base />);
    cy.get("img").should(
      "have.attr",
      "src",
      "https://storage.googleapis.com/backend-dbs-grp7/logo.jpg"
    );
  });

  it("navigates to signup page on signup button click", () => {
    cy.mount(<Base />);
    cy.get("button").contains("SIGNUP").click();
    cy.get("@router:push").should("be.calledWithMatch", "/signup");
  });

  it("navigates to login page on login button click", () => {
    cy.mount(<Base />);
    cy.get("button").contains("LOGIN").click();
    cy.get("@router:push").should("be.calledWithMatch", "/login");
  });
});
