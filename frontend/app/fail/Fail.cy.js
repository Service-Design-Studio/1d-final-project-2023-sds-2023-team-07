import React from "react";
import Fail from "./fail";

describe("<Fail />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Fail />);
    cy.contains(
      "Sorry, something when wrong with our ATM, please try again later!"
    ).should("be.visible");
    cy.contains("BACK TO HOMEPAGE").should("be.visible");
  });

  it("navigates to transaction history page on button click", () => {
    cy.mount(<Fail />);
    cy.get('button').contains("BACK TO HOMEPAGE").click();
    cy.get("@router:push").should("be.calledWithMatch", "/transactionHistory");
  });
});
