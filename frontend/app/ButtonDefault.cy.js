import React from "react";
import ButtonDefault from "./ButtonDefault";

describe("<ButtonDefault />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ButtonDefault />);
  });

  it("has the correct text", () => {
    cy.mount(<ButtonDefault text="Click Me" />);
    cy.get("button").should("have.text", "Click Me");
  });
});
