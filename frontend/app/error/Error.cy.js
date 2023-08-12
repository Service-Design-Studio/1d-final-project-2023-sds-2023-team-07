import React from "react";
import Error from "./error";

describe("<Error />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Error />);
    cy.contains(
      "Looks like you've found the doorway to the great nothing"
    ).should("be.visible");
    cy.contains(
      "Sorry about that! Please visit our hompage to get where you need to go."
    ).should("be.visible");
    cy.get("button").contains("Take me there!").should("be.visible");
  });
});
